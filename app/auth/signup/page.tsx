"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VantaBackground } from "@/components/vanta-background";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SignUpForm = {
  fullName: string;
  email: string;
  password: string;
  confirmation: string;
};

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch } = useForm<SignUpForm>();

  const onSubmit = async (data: SignUpForm) => {
    setError(null);
    setLoading(true);

    // Validate password confirmation
    if (data.password !== data.confirmation) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      // Call signup API
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'inscription");
      }

      // Auto-login after successful signup
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        setError(
          "Compte créé, mais erreur de connexion. Veuillez vous connecter manuellement."
        );
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="fixed inset-0 -z-20">
        <VantaBackground />
      </div>
      <Card className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 relative overflow-hidden">
        {/* Left decorative with animated background */}
        <div className="hidden md:flex flex-col justify-center items-start gap-4 p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 rounded-lg relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"
              style={{
                top: "10%",
                left: "10%",
                animation: "float 6s ease-in-out infinite",
              }}
            />
            <div
              className="absolute w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse"
              style={{
                bottom: "10%",
                right: "10%",
                animation: "float 8s ease-in-out infinite 1s",
              }}
            />
            <div
              className="absolute w-28 h-28 bg-accent/20 rounded-full blur-3xl"
              style={{
                top: "50%",
                right: "20%",
                animation: "float 7s ease-in-out infinite 2s",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-foreground">
              Rejoignez-nous
            </h2>
            <p className="text-muted-foreground">
              Créez votre compte pour partager et découvrir les savoirs
              ancestraux.
            </p>
          </div>

          {/* Animated dots grid */}
          <div className="absolute inset-0 opacity-30 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="dots"
                  x="20"
                  y="20"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="2"
                    cy="2"
                    r="1.5"
                    fill="currentColor"
                    className="text-primary/40"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
        </div>

        {/* Form */}
        <div className="p-2 md:p-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Créer votre compte
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Remplissez les informations ci-dessous
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm text-foreground mb-1 block">
                Nom complet
              </label>
              <Input
                type="text"
                placeholder="Jean Dupont"
                required
                {...register("fullName")}
              />
            </div>

            <div>
              <label className="text-sm text-foreground mb-1 block">
                Email
              </label>
              <Input
                type="email"
                placeholder="vous@exemple.com"
                required
                {...register("email")}
              />
            </div>

            <div>
              <label className="text-sm text-foreground mb-1 block">
                Mot de passe
              </label>
              <Input
                type="password"
                placeholder="Au moins 6 caractères"
                required
                minLength={6}
                {...register("password")}
              />
            </div>

            <div>
              <label className="text-sm text-foreground mb-1 block">
                Confirmer le mot de passe
              </label>
              <Input
                type="password"
                placeholder="Confirmer le mot de passe"
                required
                {...register("confirmation")}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Link
                href="/auth/login"
                className="cursor-pointer text-primary underline hover:text-primary/80"
              >
                Déjà inscrit ?
              </Link>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3 justify-end">
              <Button
                type="submit"
                className={`w-full ${
                  loading ? "cursor-wait" : "cursor-pointer"
                }`}
                disabled={loading}
              >
                {loading ? "Création du compte..." : "S'inscrire"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <span className="flex-1 h-px bg-border" />
              <span className="px-2">ou</span>
              <span className="flex-1 h-px bg-border" />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="relative w-full flex items-center justify-center gap-3 overflow-hidden rounded-lg border border-input/70 px-4 py-2 cursor-pointer group"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                aria-label="S'inscrire avec Google"
              >
                {/* Background hover effect */}
                <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Content */}
                <span className="relative flex items-center gap-3 text-foreground group-hover:text-background transition-colors duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 533.5 544.3"
                    className="w-5 h-5"
                  >
                    <path
                      fill="#4285F4"
                      d="M533.5 278.4c0-18.5-1.5-37.3-4.7-55.1H272v104.3h146.9c-6.3 34.2-25.4 63.2-54.3 82.7v68.7h87.6c51.3-47.2 80.3-116.8 80.3-200.6z"
                    />
                    <path
                      fill="#34A853"
                      d="M272 544.3c73.7 0 135.6-24.4 180.8-66.5l-87.6-68.7c-24.5 16.5-56 26.3-93.2 26.3-71.6 0-132.4-48.3-154.1-113.1H30.4v70.8C75.6 483.2 167.7 544.3 272 544.3z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M117.9 324.3c-10.8-32.3-10.8-66.9 0-99.2V154.3H30.4c-41.3 81.8-41.3 179.2 0 261l87.5-70.7z"
                    />
                    <path
                      fill="#EA4335"
                      d="M272 109.6c39.9-.6 78 14.4 106.9 41.5l80.2-80.2C405.9 24.6 343.9 0 272 0 167.7 0 75.6 61.1 30.4 154.3l87.5 70.8C139.6 157.9 200.4 109.6 272 109.6z"
                    />
                  </svg>
                  <span className="font-medium">S'inscrire avec Google</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
