"use client";

import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Hero Section */}
      <div className="from-primary/20 via-primary/10 to-background relative hidden overflow-hidden bg-gradient-to-br lg:flex">
        <div className="bg-[url( absolute inset-0'/grid.svg')] opacity-10" />
        <div className="relative z-10 flex w-full flex-col items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg text-center"
          >
            <h1 className="from-primary to-primary/60 mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
              Enterprise System
            </h1>
            <p className="text-muted-foreground">
              نظام متكامل لإدارة المصادقة والصلاحيات مع أعلى معايير الأمان
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { icon: "🔐", title: "2FA", desc: "Google Authenticator" },
                { icon: "🌐", title: "OAuth", desc: "Google & GitHub" },
                { icon: "🛡️", title: "RBAC", desc: "Roles & Permissions" },
                { icon: "📊", title: "Dashboard", desc: "Real-time Analytics" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background/50 rounded-lg border p-4 backdrop-blur-sm"
                >
                  <div className="mb-2 text-2xl">{item.icon}</div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Auth Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
