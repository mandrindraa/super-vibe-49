"use client";

import { RichTextEditor } from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSavoir } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Eye,
  Image as ImageIcon,
  Leaf,
  Loader2,
  Save,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Import rich text editor dynamically to avoid SSR issues
// const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
//   ssr: false,
//   loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" />,
// });

const CATEGORIES = [
  "Agriculture",
  "Alimentation",
  "Santé",
  "Construction",
  "Artisanat",
  "Art",
  "Musique",
  "Autre",
];

const ERAS = [
  "Antiquité",
  "Moyen Âge",
  "Renaissance",
  "XVIIe siècle",
  "XVIIIe siècle",
  "XIXe siècle",
  "XXe siècle",
  "Temps anciens",
];

const savoirSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  excerpt: z
    .string()
    .min(20, "La description doit contenir au moins 20 caractères")
    .max(200, "Maximum 200 caractères"),
  content: z
    .string()
    .min(100, "Le contenu doit contenir au moins 100 caractères"),
  category: z.string().min(1, "Veuillez sélectionner une catégorie"),
  era: z.string().min(1, "Veuillez sélectionner une époque"),
  region: z.string().optional(),
  tags: z.string().optional(),
  images: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

type SavoirFormData = z.infer<typeof savoirSchema>;

export default function AddSavoirPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const createSavoir = useCreateSavoir();

  const [preview, setPreview] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SavoirFormData>({
    resolver: zodResolver(savoirSchema),
    defaultValues: {
      published: true,
    },
  });

  // Redirect if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  const onSubmit = async (data: SavoirFormData) => {
    try {
      // Parse tags
      const tags = data.tags
        ? data.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      const savoir = await createSavoir.mutateAsync({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        era: data.era,
        region: data!.region,
        tags,
        images: data.images || [],
        published: data.published || true,
      });

      setSubmitSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/detail/${savoir.id}`);
      }, 2000);
    } catch (error: any) {
      console.error("Error creating savoir:", error);
    }
  };

  const formData = watch();

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted flex items-center justify-center px-4">
        <Card className="glass p-8 max-w-md w-full text-center space-y-6 shadow-xl animate-fade-scale-in">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Savoir publié avec succès !
            </h2>
            <p className="text-muted-foreground">
              Redirection vers votre savoir...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-40 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
            <Leaf className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">
              L'Arche des Savoirs
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreview(!preview)}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              {preview ? "Édition" : "Aperçu"}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary">
              Partager un Savoir
            </h1>
            <p className="text-muted-foreground">
              Transmettez vos connaissances ancestrales à la communauté
            </p>
          </div>

          {/* Error Display */}
          {createSavoir.isError && (
            <div className="glass bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                  Erreur lors de la publication
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {createSavoir.error?.message || "Une erreur est survenue"}
                </p>
              </div>
            </div>
          )}

          {preview ? (
            // Preview Mode
            <Card className="glass p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full font-medium">
                    {formData.category || "Catégorie"}
                  </span>
                  <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full">
                    {formData.era || "Époque"}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  {formData.title || "Titre du savoir"}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {formData.excerpt || "Description courte..."}
                </p>
              </div>
              <div
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{
                  __html: formData.content || "<p>Contenu...</p>",
                }}
              />
              {formData.tags && (
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {formData.tags.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-muted text-foreground px-3 py-1 rounded-full text-sm"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Card className="glass p-8 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-semibold text-foreground"
                  >
                    Titre du savoir *
                  </label>
                  <Input
                    id="title"
                    placeholder="Ex: Techniques de semis ancestrales"
                    className="h-12 text-lg"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label
                    htmlFor="excerpt"
                    className="text-sm font-semibold text-foreground"
                  >
                    Description courte *{" "}
                    <span className="text-muted-foreground font-normal">
                      (max 200 caractères)
                    </span>
                  </label>
                  <Textarea
                    id="excerpt"
                    placeholder="Résumé en quelques phrases..."
                    className="min-h-24 resize-none"
                    maxLength={200}
                    {...register("excerpt")}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{errors.excerpt?.message}</span>
                    <span>{watch("excerpt")?.length || 0}/200</span>
                  </div>
                </div>

                {/* Category & Era */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="category"
                      className="text-sm font-semibold text-foreground"
                    >
                      Catégorie *
                    </label>
                    <select
                      id="category"
                      className="w-full h-12 px-3 rounded-md border border-input bg-background"
                      {...register("category")}
                    >
                      <option value="">Sélectionner...</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-sm text-red-600">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="era"
                      className="text-sm font-semibold text-foreground"
                    >
                      Époque *
                    </label>
                    <select
                      id="era"
                      className="w-full h-12 px-3 rounded-md border border-input bg-background"
                      {...register("era")}
                    >
                      <option value="">Sélectionner...</option>
                      {ERAS.map((era) => (
                        <option key={era} value={era}>
                          {era}
                        </option>
                      ))}
                    </select>
                    {errors.era && (
                      <p className="text-sm text-red-600">
                        {errors.era.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <label
                    htmlFor="region"
                    className="text-sm font-semibold text-foreground"
                  >
                    Région{" "}
                    <span className="text-muted-foreground font-normal">
                      (optionnel)
                    </span>
                  </label>
                  <Input
                    id="region"
                    placeholder="Ex: Normandie, Provence..."
                    {...register("region")}
                  />
                </div>

                {/* Content (Rich Text Editor) */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Contenu détaillé *
                  </label>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Écrivez votre savoir détaillé ici..."
                      />
                    )}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-600">
                      {errors.content.message}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label
                    htmlFor="tags"
                    className="text-sm font-semibold text-foreground"
                  >
                    Tags{" "}
                    <span className="text-muted-foreground font-normal">
                      (séparés par des virgules)
                    </span>
                  </label>
                  <Input
                    id="tags"
                    placeholder="agriculture, bio, tradition, semis..."
                    {...register("tags")}
                  />
                  <p className="text-xs text-muted-foreground">
                    Les tags aident les utilisateurs à trouver votre savoir
                  </p>
                </div>

                {/* Images (placeholder for now) */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Images{" "}
                    <span className="text-muted-foreground font-normal">
                      (bientôt disponible)
                    </span>
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">
                      L'upload d'images sera bientôt disponible
                    </p>
                  </div>
                </div>
              </Card>

              {/* Submit Buttons */}
              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="gap-2 bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publication...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Publier le savoir
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
