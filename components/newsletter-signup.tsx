"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase, trackEvent } from "@/lib/supabase";

interface NewsletterSignupProps {
  source?: string;
  className?: string;
}

export function NewsletterSignup({
  source = "unknown",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const { error } = await supabase.from("leads").insert([
        {
          email,
          source,
          tags: ["newsletter"],
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          setMessage("Vous êtes déjà inscrit à notre newsletter !");
          setStatus("success");
        } else {
          throw error;
        }
      } else {
        setMessage("Merci ! Vous êtes maintenant inscrit à notre newsletter.");
        setStatus("success");

        // Track successful newsletter signup
        await trackEvent("newsletter_signup", source, { email });
      }

      setEmail("");
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setMessage("Une erreur est survenue. Veuillez réessayer.");
      setStatus("error");
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  return (
    <div className={className}>
      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400"
        >
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="border-purple-200 focus:border-purple-500 dark:border-purple-800 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>
          <Button
            type="submit"
            disabled={status === "loading" || !email}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                S'abonner
              </>
            )}
          </Button>
        </form>
      )}

      {status === "error" && (
        <p className="text-red-600 dark:text-red-400 text-sm mt-2">{message}</p>
      )}
    </div>
  );
}
