"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { footerLinks } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="bg-primary/20 absolute inset-0 rounded-full blur-md" />
                <Shield className="text-primary relative h-8 w-8" />
              </div>
              <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                Enterprise
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              نظام متكامل لإدارة المصادقة والصلاحيات مع أعلى معايير الأمان، مصمم
              خصيصاً للمؤسسات والشركات الناشئة.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted hover:bg-primary rounded-full p-2 transition-colors hover:text-white"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted hover:bg-primary rounded-full p-2 transition-colors hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted hover:bg-primary rounded-full p-2 transition-colors hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-4 border-b border-t py-8 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <Mail className="text-primary h-5 w-5" />
            <div>
              <p className="text-sm font-medium">البريد الإلكتروني</p>
              <a
                href="mailto:support@enterprise.com"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                support@enterprise.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-primary h-5 w-5" />
            <div>
              <p className="text-sm font-medium">رقم الدعم</p>
              <a
                href="tel:+966123456789"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                +966 12 345 6789
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-primary h-5 w-5" />
            <div>
              <p className="text-sm font-medium">المقر الرئيسي</p>
              <p className="text-muted-foreground text-sm">
                الرياض، المملكة العربية السعودية
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <p className="text-muted-foreground text-center text-sm md:text-right">
            © {currentYear} Enterprise. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary text-sm"
            >
              سياسة الخصوصية
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary text-sm"
            >
              شروط الاستخدام
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary text-sm"
            >
              اتفاقية الخدمة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
