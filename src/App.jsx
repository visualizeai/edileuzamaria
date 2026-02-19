import React, { useEffect, useMemo, useState } from "react";
import {
  CakeSlice,
  Candy,
  Sparkles,
  Phone,
  Instagram,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  PartyPopper,
  MessageCircle,
} from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999";
const INSTAGRAM_HANDLE = "lufestaseeventos";
const ADDRESS_LINE = "Rua das Flores, 123 — Centro";
const CITY_LINE = "Sua Cidade — UF";
const BUSINESS_HOURS = "Seg–Sáb: 09h às 18h";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatBRL(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildWhatsAppLink({ text }) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `${base}${query}`;
}

function buildInstagramLink() {
  return `https://instagram.com/${INSTAGRAM_HANDLE}`;
}

function buildMapsLink() {
  const q = encodeURIComponent(`${ADDRESS_LINE}, ${CITY_LINE}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function Badge({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm text-slate-700 shadow-sm backdrop-blur">
      <Icon className="h-4 w-4 text-slate-900" />
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-sm">
          <Sparkles className="h-4 w-4" />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryButton({ href, onClick, children, icon: Icon, className }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-slate-900/20",
        className
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{children}</span>
      <ChevronRight className="h-4 w-4 opacity-80" />
    </Comp>
  );
}

function SecondaryButton({ href, onClick, children, icon: Icon, className }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-900/10",
        className
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{children}</span>
    </Comp>
  );
}

function Card({ className, children }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

function Navbar({ onNavigate }) {
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => [
      { id: "inicio", label: "Início" },
      { id: "cardapio", label: "Cardápio" },
      { id: "kits", label: "Kits" },
      { id: "depoimentos", label: "Depoimentos" },
      { id: "contato", label: "Contato" },
    ],
    []
  );

  function go(id) {
    setOpen(false);
    onNavigate(id);
  }

  return (
    <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <button
          onClick={() => go("inicio")}
          className="group inline-flex items-center gap-3 rounded-xl px-2 py-1 transition-all duration-200 hover:bg-slate-50"
          aria-label="Ir para o início"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-sm transition-all duration-200 group-hover:shadow-md">
            <CakeSlice className="h-5 w-5" />
          </div>
          <div className="text-left leading-tight">
            <div className="text-sm font-semibold text-slate-900">
              Lu Festas e Eventos
            </div>
            <div className="text-xs text-slate-600">Confeitaria artesanal</div>
          </div>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <SecondaryButton
            href={buildInstagramLink()}
            icon={Instagram}
            className="px-4 py-2"
          >
            Instagram
          </SecondaryButton>
          <PrimaryButton
            href={buildWhatsAppLink({
              text: "Olá! Quero fazer um orçamento para um evento 😊",
            })}
            icon={MessageCircle}
            className="px-4 py-2"
          >
            Orçar no WhatsApp
          </PrimaryButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-200 hover:shadow-md md:hidden"
          aria-label="Abrir menu"
        >
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 rounded bg-slate-900" />
            <span className="h-0.5 w-5 rounded bg-slate-900" />
            <span className="h-0.5 w-5 rounded bg-slate-900" />
          </div>
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="grid gap-2">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <span>{l.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </button>
              ))}
              <div className="grid grid-cols-1 gap-2 pt-2">
                <SecondaryButton href={buildInstagramLink()} icon={Instagram}>
                  Instagram
                </SecondaryButton>
                <PrimaryButton
                  href={buildWhatsAppLink({
                    text: "Olá! Quero fazer um orçamento para um evento 😊",
                  })}
                  icon={MessageCircle}
                >
                  Orçar no WhatsApp
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Hero({ onNavigate }) {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-50" />
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute -bottom-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-slate-900/5 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-16">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge icon={PartyPopper}>Aniversários</Badge>
            <Badge icon={Sparkles}>Casamentos</Badge>
            <Badge icon={ShieldCheck}>Eventos corporativos</Badge>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Doces que viram memória em cada celebração.
          </h1>

          <p className="text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
            A <span className="font-semibold text-slate-900">Lu Festas e Eventos</span>{" "}
            cria bolos, doces finos e kits festa com acabamento premium, sabores
            clássicos e opções personalizadas para o seu tema.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton
              href={buildWhatsAppLink({
                text: "Olá! Quero um orçamento para bolo e doces. Pode me ajudar?",
              })}
              icon={MessageCircle}
              className="w-full sm:w-auto"
            >
              Pedir orçamento
            </PrimaryButton>
            <SecondaryButton
              onClick={() => onNavigate("cardapio")}
              icon={CakeSlice}
              className="w-full sm:w-auto"
            >
              Ver cardápio
            </SecondaryButton>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <CheckCircle2 className="h-4 w-4" />
                Produção artesanal
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Ingredientes selecionados e frescor.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Truck className="h-4 w-4" />
                Entrega sob consulta
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Retirada e entrega para eventos.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Star className="h-4 w-4" />
                Acabamento premium
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Personalização com seu tema.
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-slate-900/10 via-slate-900/0 to-slate-900/10 blur-2xl" />
          <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-soft">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative h-56 md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1200&q=80"
                  alt="Bolo decorado"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid gap-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Destaque da semana
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      Monte seu kit com tema e cores.
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Sob encomenda
                  </span>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Candy className="h-4 w-4" />
                      Doces finos
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      Brigadeiro gourmet, beijinho, ninho e mais.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <CakeSlice className="h-4 w-4" />
                      Bolos personalizados
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      Chantininho, buttercream e ganache.
                    </div>
                  </div>
                </div>

                <PrimaryButton
                  href={buildWhatsAppLink({
                    text: "Olá! Quero montar um kit festa (bolo + doces). Quais opções você tem?",
                  })}
                  icon={MessageCircle}
                  className="w-full"
                >
                  Montar meu kit
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const items = [
    {
      icon: CakeSlice,
      title: "Bolos personalizados",
      desc: "Tamanhos para 10 a 80 fatias, com tema, topper e acabamento premium.",
      tags: ["Chantininho", "Ganache", "Buttercream"],
    },
    {
      icon: Candy,
      title: "Doces finos & gourmet",
      desc: "Caixinhas e bandejas com variedade: ninho, pistache, paçoca e mais.",
      tags: ["Sortidos", "Caixinhas", "Bandejas"],
    },
    {
      icon: Sparkles,
      title: "Mesa de doces",
      desc: "Montagem completa com decoração, suportes e reposição sob consulta.",
      tags: ["Eventos", "Decoração", "Montagem"],
    },
  ];

  const flavors = [
    "Chocolate belga",
    "Ninho com morango",
    "Doce de leite",
    "Red velvet",
    "Coco cremoso",
    "Limão siciliano",
  ];

  return (
    <section id="cardapio" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Cardápio"
          title="Clássicos que todo mundo ama, com toque artesanal."
          subtitle="Escolha o que combina com o seu evento. Personalizamos cores, tema e combinações de sabores."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title}>
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                  <it.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-semibold text-slate-900">
                    {it.title}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-600">
                    {it.desc}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="p-0 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-56 md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80"
                  alt="Doces gourmet"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-semibold text-slate-900">
                  Sabores mais pedidos
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Combinações equilibradas para agradar todos os convidados.
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {flavors.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-slate-900" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  Como funciona o pedido
                </div>
                <div className="mt-1 text-sm leading-relaxed text-slate-600">
                  Você escolhe o tipo de produto, informa data e tema, e nós
                  enviamos opções e valores.
                </div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                <Phone className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                {
                  title: "1) Conte a data e o tipo de evento",
                  desc: "Aniversário, casamento, batizado, corporativo.",
                },
                {
                  title: "2) Defina quantidade e preferências",
                  desc: "Número de convidados, sabores e restrições.",
                },
                {
                  title: "3) Personalização e entrega",
                  desc: "Tema, cores, retirada ou entrega sob consulta.",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="text-sm font-semibold text-slate-900">
                    {s.title}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                href={buildWhatsAppLink({
                  text: "Olá! Quero fazer um pedido. Minha data é __/__/____ e o evento é ____.",
                })}
                icon={MessageCircle}
                className="w-full sm:w-auto"
              >
                Iniciar pedido
              </PrimaryButton>
              <SecondaryButton
                href={buildInstagramLink()}
                icon={Instagram}
                className="w-full sm:w-auto"
              >
                Ver fotos
              </SecondaryButton>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function KitsSection() {
  const kits = [
    {
      name: "Kit Festa Essencial",
      price: 189,
      desc: "Perfeito para comemorações intimistas.",
      includes: ["Bolo para 10–12 fatias", "30 doces gourmet", "Topper simples"],
      highlight: false,
    },
    {
      name: "Kit Festa Completo",
      price: 329,
      desc: "O mais pedido para aniversários e mini eventos.",
      includes: [
        "Bolo para 20–25 fatias",
        "60 doces gourmet",
        "Doces finos (20 un.)",
        "Topper + plaquinha",
      ],
      highlight: true,
    },
    {
      name: "Kit Premium Temático",
      price: 549,
      desc: "Para impressionar com variedade e acabamento.",
      includes: [
        "Bolo para 35–40 fatias",
        "100 doces gourmet",
        "Doces finos (40 un.)",
        "Personalização avançada",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="kits" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Kits Festa"
          title="Escolha um kit e personalize do seu jeito."
          subtitle="Valores base para referência. Ajustamos sabores, tema e quantidade conforme seu evento."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {kits.map((k) => (
            <div
              key={k.name}
              className={cn(
                "rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                k.highlight
                  ? "border-slate-900 bg-slate-900 text-white shadow-soft"
                  : "border-slate-200 bg-white"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className={cn(
                      "text-lg font-semibold",
                      k.highlight ? "text-white" : "text-slate-900"
                    )}
                  >
                    {k.name}
                  </div>
                  <div
                    className={cn(
                      "mt-1 text-sm",
                      k.highlight ? "text-white/80" : "text-slate-600"
                    )}
                  >
                    {k.desc}
                  </div>
                </div>
                {k.highlight ? (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                    Mais pedido
                  </span>
                ) : null}
              </div>

              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <div
                    className={cn(
                      "text-3xl font-semibold tracking-tight",
                      k.highlight ? "text-white" : "text-slate-900"
                    )}
                  >
                    {formatBRL(k.price)}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      k.highlight ? "text-white/70" : "text-slate-500"
                    )}
                  >
                    a partir de
                  </div>
                </div>
                <div
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl shadow-sm",
                    k.highlight ? "bg-white text-slate-900" : "bg-slate-900 text-white"
                  )}
                >
                  <CakeSlice className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-2">
                {k.includes.map((inc) => (
                  <div
                    key={inc}
                    className={cn(
                      "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
                      k.highlight
                        ? "border-white/15 bg-white/5 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-800"
                    )}
                  >
                    <CheckCircle2
                      className={cn(
                        "mt-0.5 h-4 w-4 flex-none",
                        k.highlight ? "text-white" : "text-slate-900"
                      )}
                    />
                    <span className="leading-relaxed">{inc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <PrimaryButton
                  href={buildWhatsAppLink({
                    text: `Olá! Tenho interesse no ${k.name}. Minha data é __/__/____ e o tema é _____. Pode me passar as opções?`,
                  })}
                  icon={MessageCircle}
                  className={cn(
                    "w-full",
                    k.highlight
                      ? "bg-white text-slate-900 hover:bg-white/90 focus:ring-white/20"
                      : ""
                  )}
                >
                  Quero esse kit
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <div className="text-lg font-semibold text-slate-900">
                Precisa de algo 100% sob medida?
              </div>
              <div className="mt-1 text-sm leading-relaxed text-slate-600">
                Montamos kits para qualquer quantidade, com opções sem lactose e
                sem açúcar sob consulta.
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <SecondaryButton
                href={buildInstagramLink()}
                icon={Instagram}
                className="w-full sm:w-auto"
              >
                Inspirações
              </SecondaryButton>
              <PrimaryButton
                href={buildWhatsAppLink({
                  text: "Olá! Quero um kit sob medida. Quantas opções vocês têm para meu evento?",
                })}
                icon={MessageCircle}
                className="w-full sm:w-auto"
              >
                Falar com a Lu
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mariana S.",
      role: "Aniversário infantil",
      text: "O bolo ficou impecável e os doces sumiram da mesa! Atendimento super atencioso e entrega no horário.",
      rating: 5,
    },
    {
      name: "Rafael G.",
      role: "Evento corporativo",
      text: "Apresentação linda e sabores equilibrados. A equipe elogiou muito. Vamos repetir com certeza.",
      rating: 5,
    },
    {
      name: "Camila & João",
      role: "Noivado",
      text: "Doces finos maravilhosos e tudo muito caprichado. Deu um toque especial na nossa comemoração.",
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Depoimentos"
          title="Quem prova, recomenda."
          subtitle="Carinho no atendimento e cuidado em cada detalhe — do sabor à apresentação."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-slate-900" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                “{t.text}”
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("Aniversário");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");

  const whatsappText = useMemo(() => {
    const parts = [
      "Olá! Quero um orçamento na Lu Festas e Eventos.",
      name ? `Nome: ${name}` : null,
      eventType ? `Evento: ${eventType}` : null,
      date ? `Data: ${date}` : null,
      guests ? `Convidados (aprox.): ${guests}` : null,
      message ? `Detalhes: ${message}` : null,
    ].filter(Boolean);
    return parts.join("\n");
  }, [name, eventType, date, guests, message]);

  return (
    <section id="contato" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Contato"
          title="Vamos planejar seu evento?"
          subtitle="Envie as informações e receba opções de sabores, tamanhos e valores."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  Solicitar orçamento
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Preencha e envie direto no WhatsApp.
                </div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </div>
            </div>

            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(buildWhatsAppLink({ text: whatsappText }), "_blank");
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Seu nome
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                    placeholder="Ex.: Luana"
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Tipo de evento
                  </span>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option>Aniversário</option>
                    <option>Casamento</option>
                    <option>Batizado</option>
                    <option>Chá revelação</option>
                    <option>Corporativo</option>
                    <option>Outro</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Data
                  </span>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                    placeholder="Ex.: 20/08/2026"
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Convidados (aprox.)
                  </span>
                  <input
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                    placeholder="Ex.: 30"
                    inputMode="numeric"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-900">
                  Detalhes do pedido
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[110px] rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                  placeholder="Tema, cores, sabores preferidos, restrições, se precisa de entrega..."
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <PrimaryButton
                  href={buildWhatsAppLink({ text: whatsappText })}
                  icon={MessageCircle}
                  className="w-full"
                >
                  Enviar no WhatsApp
                </PrimaryButton>
                <SecondaryButton
                  href={buildInstagramLink()}
                  icon={Instagram}
                  className="w-full"
                >
                  Ver Instagram
                </SecondaryButton>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
                Ao enviar, você será direcionado para o WhatsApp com a mensagem
                pronta. Ajuste os detalhes se quiser antes de enviar.
              </div>
            </form>
          </Card>

          <div className="grid gap-6">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    Informações
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    Atendimento e localização.
                  </div>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <MapPin className="mt-0.5 h-4 w-4 text-slate-900" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Endereço
                    </div>
                    <div className="text-sm text-slate-600">
                      {ADDRESS_LINE}
                      <br />
                      {CITY_LINE}
                    </div>
                    <a
                      href={buildMapsLink()}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition-all duration-200 hover:decoration-slate-900"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver no mapa <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Clock className="mt-0.5 h-4 w-4 text-slate-900" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Horário
                    </div>
                    <div className="text-sm text-slate-600">{BUSINESS_HOURS}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Phone className="mt-0.5 h-4 w-4 text-slate-900" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      WhatsApp
                    </div>
                    <a
                      href={buildWhatsAppLink({ text: "Olá! Vim pelo site 😊" })}
                      className="text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition-all duration-200 hover:decoration-slate-900"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Clique para conversar
                    </a>
                    <div className="mt-1 text-xs text-slate-600">
                      Resposta por ordem de chegada.
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden">
              <div className="relative h-56">
                <img
                  src="https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1200&q=80"
                  alt="Mesa de doces"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-lg font-semibold text-slate-900">
                  Quer uma mesa completa?
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Montagem com doces, bolo e decoração sob consulta.
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton
                    href={buildWhatsAppLink({
                      text: "Olá! Quero orçamento para mesa completa (bolo + doces + decoração). Minha data é __/__/____.",
                    })}
                    icon={MessageCircle}
                    className="w-full sm:w-auto"
                  >
                    Orçar mesa completa
                  </PrimaryButton>
                  <SecondaryButton
                    href={buildInstagramLink()}
                    icon={Instagram}
                    className="w-full sm:w-auto"
                  >
                    Ver portfólio
                  </SecondaryButton>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
                <CakeSlice className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-slate-900">
                  Lu Festas e Eventos
                </div>
                <div className="text-xs text-slate-600">
                  Confeitaria artesanal
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              Bolos, doces finos e kits festa para transformar sua comemoração em
              um momento inesquecível.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-semibold text-slate-900">Navegação</div>
            {[
              { id: "inicio", label: "Início" },
              { id: "cardapio", label: "Cardápio" },
              { id: "kits", label: "Kits" },
              { id: "depoimentos", label: "Depoimentos" },
              { id: "contato", label: "Contato" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => onNavigate(l.id)}
                className="text-left text-sm font-medium text-slate-600 transition-all duration-200 hover:text-slate-900"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3">
            <div className="text-sm font-semibold text-slate-900">Contato</div>
            <a
              href={buildWhatsAppLink({ text: "Olá! Vim pelo site 😊" })}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
              <ChevronRight className="ml-auto h-4 w-4 text-slate-500" />
            </a>
            <a
              href={buildInstagramLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Instagram className="h-4 w-4" />
              Instagram
              <ChevronRight className="ml-auto h-4 w-4 text-slate-500" />
            </a>
            <a
              href={buildMapsLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <MapPin className="h-4 w-4" />
              Localização
              <ChevronRight className="ml-auto h-4 w-4 text-slate-500" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} Lu Festas e Eventos. Todos os direitos
            reservados.
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              <Sparkles className="h-4 w-4 text-slate-900" />
              Feito com carinho
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash?.replace("#", "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function navigate(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onNavigate={navigate} />
      <main>
        <Hero onNavigate={navigate} />
        <MenuSection />
        <KitsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer onNavigate={navigate} />

      <a
        href={buildWhatsAppLink({ text: "Olá! Vim pelo site 😊" })}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}