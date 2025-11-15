import { getServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  fullName: z
    .string()
    .min(2, "Le nom complet doit contenir au moins 2 caractères"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password, fullName } = validation.data;
    const supabase = await getServerClient();

    // Check if user already exists
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const userExists = existingUser?.users.some((u) => u.email === email);

    if (userExists) {
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 400 }
      );
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
        },
      });

    if (authError || !authData.user) {
      console.error("Auth creation error:", authError);
      return NextResponse.json(
        { error: authError?.message || "Erreur lors de la création du compte" },
        { status: 400 }
      );
    }

    // Generate unique username
    const baseUsername = email.split("@")[0];
    const username = `${baseUsername}-${Math.random()
      .toString(36)
      .substr(2, 5)}`;

    // Create user profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      username,
      full_name: fullName,
      avatar_url: null,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Delete the auth user since profile creation failed
      await supabase.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: "Erreur lors de la création du profil" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Compte créé avec succès",
        user: {
          id: authData.user.id,
          email: authData.user.email,
          username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
}
