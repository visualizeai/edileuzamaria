import React, { useEffect, useMemo, useRef, useState } from "react";
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
  ArrowUpRight,
  BadgeCheck,
  HeartHandshake,
  UtensilsCrossed,
  Package,
  CalendarDays,
  Quote,
  Send,
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
      {href ? <ArrowUpRight className="h-4 w-4 text-slate-500" /> : null}
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

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="mt-1 text-xs text-slate-600">{value}</div>
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
      { id: "processo", label: "Como funciona" },
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
            A{" "}
            <span className="font-semibold text-slate-900">
              Lu Festas e Eventos
            </span>{" "}
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
            <Stat icon={CheckCircle2} label="Produção artesanal" value="Ingredientes selecionados e frescor." />
            <Stat icon={Truck} label="Entrega sob consulta" value="Retirada e entrega para eventos." />
            <Stat icon={Star} label="Acabamento premium" value="Personalização com seu tema." />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-slate-900/10 via-slate-900/0 to-slate-900/10 blur-2xl" />
          <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-soft">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative h-56 md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1542826438-bd32f43d6b1f?auto=format&fit=crop&w=1200&q=80"
                  alt="Bolo decorado artesanal"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <BadgeCheck className="h-4 w-4 text-slate-900" />
                  <span>Mais pedidos da semana</span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          Bolo + Doces finos (tema)
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          Ideal para 20–30 pessoas
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {formatBRL(320)}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          Kit festa completo
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          Bolo + docinhos + salgados
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {formatBRL(490)}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          Mesa de doces (evento)
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          Montagem sob orçamento
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        Sob consulta
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <PrimaryButton
                    href={buildWhatsAppLink({
                      text: "Olá! Quero um orçamento para um kit festa. Pode me enviar opções e valores?",
                    })}
                    icon={MessageCircle}
                    className="w-full sm:w-auto"
                  >
                    Quero um kit
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => onNavigate("kits")}
                    icon={Package}
                    className="w-full sm:w-auto"
                  >
                    Ver kits
                  </SecondaryButton>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                    <CalendarDays className="h-4 w-4 text-slate-900" />
                    Encomendas com antecedência
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                    <HeartHandshake className="h-4 w-4 text-slate-900" />
                    Atendimento humanizado
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold text-slate-700">
                Tempo médio de resposta
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                15–30 min
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold text-slate-700">
                Avaliação dos clientes
              </div>
              <div className="mt-1 flex items-center gap-2 text-lg font-semibold text-slate-900">
                4,9 <Star className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const items = useMemo(
    () => [
      {
        icon: CakeSlice,
        title: "Bolos decorados",
        desc: "Buttercream, chantininho e temas personalizados.",
        bullets: ["Topo e acabamento premium", "Sabores clássicos e especiais", "Tamanhos sob medida"],
      },
      {
        icon: Candy,
        title: "Doces finos",
        desc: "Brigadeiros gourmet, trufas e mini sobremesas.",
        bullets: ["Caixinhas para presente", "Opções sem álcool", "Montagem para mesa"],
      },
      {
        icon: UtensilsCrossed,
        title: "Salgados & combos",
        desc: "Mini salgados e combos para completar a festa.",
        bullets: ["Assados e fritos", "Porções por pessoa", "Ideal para kits"],
      },
    ],
    []
  );

  const highlights = useMemo(
    () => [
      {
        title: "Bolo tema (20 pessoas)",
        price: 220,
        note: "A partir de",
      },
      {
        title: "100 docinhos gourmet",
        price: 180,
        note: "A partir de",
      },
      {
        title: "Kit festa (20 pessoas)",
        price: 490,
        note: "A partir de",
      },
    ],
    []
  );

  return (
    <section id="cardapio" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Cardápio"
          title="Escolha o que combina com o seu evento"
          subtitle="Opções para aniversários, casamentos e eventos corporativos — com personalização de tema, cores e sabores."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title} className="p-7">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                  <it.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    {it.title}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{it.desc}</div>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {it.bullets.map((b) => (
                  <div
                    key={b}
                    className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-900" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {h.title}
                  </div>
                  <div className="mt-1 text-xs text-slate-600">{h.note}</div>
                </div>
                <div className="text-lg font-semibold text-slate-900">
                  {formatBRL(h.price)}
                </div>
              </div>
              <div className="mt-4 h-px w-full bg-slate-200" />
              <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-900" />
                  Produção sob encomenda
                </span>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-slate-900" />
                  Personalizável
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 shadow-soft md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white">
                <Sparkles className="h-4 w-4" />
                Orçamento rápido
              </div>
              <div className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Me diga a data, o tema e a quantidade de pessoas.
              </div>
              <div className="mt-2 text-sm leading-relaxed text-white/80">
                Respondemos com sugestões de sabores, tamanhos e valores para você
                fechar com segurança.
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <SecondaryButton
                href={buildInstagramLink()}
                icon={Instagram}
                className="w-full border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/15 sm:w-auto"
              >
                Ver Instagram
              </SecondaryButton>
              <PrimaryButton
                href={buildWhatsAppLink({
                  text: "Olá! Quero um orçamento. Data do evento: __/__/__. Tema: __. Quantidade de pessoas: __. Pode me ajudar?",
                })}
                icon={MessageCircle}
                className="w-full bg-white text-slate-900 hover:bg-slate-100 sm:w-auto"
              >
                Orçar agora
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KitsSection() {
  const kits = useMemo(
    () => [
      {
        title: "Kit Festa Essencial",
        price: 390,
        people: "Até 15 pessoas",
        items: ["Bolo decorado", "50 docinhos", "50 salgados"],
        tag: "Mais vendido",
      },
      {
        title: "Kit Festa Completo",
        price: 490,
        people: "Até 20 pessoas",
        items: ["Bolo decorado", "80 docinhos", "80 salgados", "Mini sobremesa"],
        tag: "Melhor custo-benefício",
      },
      {
        title: "Kit Premium",
        price: 690,
        people: "Até 30 pessoas",
        items: ["Bolo decorado", "120 docinhos finos", "120 salgados", "Mesa de doces (mini)"],
        tag: "Para impressionar",
      },
    ],
    []
  );

  return (
    <section id="kits" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Kits"
          title="Kits festa prontos para facilitar sua vida"
          subtitle="Combos equilibrados para você resolver bolo, doces e salgados em um só pedido."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {kits.map((k, idx) => (
            <div
              key={k.title}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                idx === 1 ? "ring-2 ring-slate-900/10" : ""
              )}
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-slate-900/5 blur-2xl" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                      <Package className="h-4 w-4 text-slate-900" />
                      {k.tag}
                    </div>
                    <div className="mt-3 text-lg font-semibold text-slate-900">
                      {k.title}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{k.people}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-600">
                      a partir de
                    </div>
                    <div className="text-2xl font-semibold text-slate-900">
                      {formatBRL(k.price)}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-2">
                  {k.items.map((it) => (
                    <div
                      key={it}
                      className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-900" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <PrimaryButton
                    href={buildWhatsAppLink({
                      text: `Olá! Quero o ${k.title}. Data do evento: __/__/__. Tema: __. Pode me passar os detalhes?`,
                    })}
                    icon={MessageCircle}
                    className="w-full"
                  >
                    Pedir este kit
                  </PrimaryButton>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-900" />
                      Sob encomenda
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-slate-900" />
                      Personalizável
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  Segurança e qualidade
                </div>
                <div className="mt-1 text-sm leading-relaxed text-slate-600">
                  Produção artesanal com padrão de acabamento e atenção aos
                  detalhes. Ajustamos sabores e itens conforme restrições e
                  preferências.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  Retirada ou entrega
                </div>
                <div className="mt-1 text-sm leading-relaxed text-slate-600">
                  Combine o melhor formato para você. Para eventos, avaliamos
                  logística e horário para chegar tudo perfeito.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = useMemo(
    () => [
      {
        icon: MessageCircle,
        title: "1) Você chama no WhatsApp",
        desc: "Envie data, tema e quantidade de pessoas. Se tiver referência, melhor ainda.",
      },
      {
        icon: Sparkles,
        title: "2) Montamos a proposta",
        desc: "Sugerimos sabores, tamanhos e combinações com valores e prazos.",
      },
      {
        icon: CakeSlice,
        title: "3) Produção artesanal",
        desc: "Tudo feito sob encomenda, com acabamento premium e atenção aos detalhes.",
      },
      {
        icon: Truck,
        title: "4) Retirada/entrega",
        desc: "Você retira ou combinamos entrega (sob consulta) para o seu evento.",
      },
    ],
    []
  );

  return (
    <section id="processo" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Como funciona"
          title="Do primeiro contato até a mesa pronta"
          subtitle="Um processo simples, rápido e com acompanhamento para você ficar tranquila(o)."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <Card key={s.title} className="p-7">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 text-base font-semibold text-slate-900">
                {s.title}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-slate-600">
                {s.desc}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">
                  Dica: garanta sua data
                </div>
                <div className="mt-1 text-sm leading-relaxed text-slate-600">
                  Para temas personalizados e eventos maiores, recomendamos
                  solicitar com antecedência para garantir agenda e melhor
                  planejamento.
                </div>
              </div>
            </div>
            <PrimaryButton
              href={buildWhatsAppLink({
                text: "Olá! Quero garantir minha data. Evento em __/__/__. Tema: __. Quantidade de pessoas: __.",
              })}
              icon={MessageCircle}
              className="w-full md:w-auto"
            >
              Consultar disponibilidade
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = useMemo(
    () => [
      {
        name: "Mariana S.",
        role: "Aniversário infantil",
        text: "O bolo ficou impecável e os docinhos estavam maravilhosos. Chegou tudo certinho e muito bem embalado.",
      },
      {
        name: "Rafael P.",
        role: "Evento corporativo",
        text: "Atendimento rápido e super profissional. A mesa de doces ficou elegante e todo mundo elogiou.",
      },
      {
        name: "Camila & João",
        role: "Casamento",
        text: "Delicado, saboroso e lindo. A Lu entendeu exatamente o que queríamos e entregou além do esperado.",
      },
    ],
    []
  );

  return (
    <section id="depoimentos" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Depoimentos"
          title="Quem prova, recomenda"
          subtitle="Algumas mensagens de clientes que confiaram na Lu Festas e Eventos."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-slate-900/5 blur-2xl" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">{t.role}</div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-900">
                    <Star className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                  <div className="flex items-start gap-2">
                    <Quote className="mt-0.5 h-4 w-4 text-slate-900" />
                    <p>{t.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <div className="text-lg font-semibold text-slate-900">
                Quer ver mais fotos e bastidores?
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Acompanhe os trabalhos recentes e novidades no Instagram.
              </div>
            </div>
            <SecondaryButton
              href={buildInstagramLink()}
              icon={Instagram}
              className="w-full md:w-auto"
            >
              Abrir Instagram
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");
  const [theme, setTheme] = useState("");
  const [notes, setNotes] = useState("");

  const message = useMemo(() => {
    const parts = [
      "Olá! Quero um orçamento 😊",
      name ? `Nome: ${name}` : null,
      date ? `Data do evento: ${date}` : null,
      people ? `Quantidade de pessoas: ${people}` : null,
      theme ? `Tema/cores: ${theme}` : null,
      notes ? `Detalhes: ${notes}` : null,
    ].filter(Boolean);
    return parts.join("\n");
  }, [name, date, people, theme, notes]);

  return (
    <section id="contato" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          eyebrow="Contato"
          title="Vamos montar seu pedido?"
          subtitle="Envie as informações e abra o WhatsApp com a mensagem pronta."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-900">
                  Nome
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Data do evento
                  </label>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                    placeholder="dd/mm/aaaa"
                    inputMode="numeric"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Pessoas
                  </label>
                  <input
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                    placeholder="Ex.: 20"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-900">
                  Tema/cores
                </label>
                <input
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                  placeholder="Ex.: Jardim, rosa e dourado"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-slate-900">
                  Detalhes (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[110px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10"
                  placeholder="Sabores, restrições, referências, endereço para entrega..."
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <PrimaryButton
                  href={buildWhatsAppLink({ text: message })}
                  icon={Send}
                  className="w-full"
                >
                  Enviar no WhatsApp
                </PrimaryButton>
                <SecondaryButton
                  href={buildInstagramLink()}
                  icon={Instagram}
                  className="w-full"
                >
                  Falar no Instagram
                </SecondaryButton>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
                Ao enviar, você será direcionado ao WhatsApp com a mensagem pronta.
                Ajuste como quiser antes de enviar.
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    Atendimento
                  </div>
                  <div className="mt-2 grid gap-2 text-sm text-slate-700">
                    <a
                      className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md"
                      href={buildWhatsAppLink({ text: "Olá! Quero um orçamento 😊" })}
                    >
                      <span className="inline-flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-slate-900" />
                        WhatsApp
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    </a>

                    <a
                      className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md"
                      href={buildInstagramLink()}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-slate-900" />
                        @{INSTAGRAM_HANDLE}
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold text-slate-900">
                    Localização
                  </div>
                  <div className="mt-2 text-sm text-slate-700">
                    <div className="font-semibold text-slate-900">
                      {ADDRESS_LINE}
                    </div>
                    <div className="text-slate-600">{CITY_LINE}</div>
                  </div>

                  <div className="mt-4">
                    <SecondaryButton
                      href={buildMapsLink()}
                      icon={MapPin}
                      className="w-full"
                    >
                      Abrir no Maps
                    </SecondaryButton>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Clock className="h-4 w-4" />
                      Horário
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      {BUSINESS_HOURS}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 shadow-soft md:p-8">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-slate-900 shadow-sm">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    Personalização de tema
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-white/80">
                    Envie referências (cores, personagens, estilo) e montamos uma
                    proposta com acabamento premium.
                  </div>
                  <div className="mt-4">
                    <PrimaryButton
                      href={buildWhatsAppLink({
                        text: "Olá! Quero personalizar um bolo/kit. Tema: __. Data: __/__/__. Pessoas: __. Vou enviar referências.",
                      })}
                      icon={MessageCircle}
                      className="w-full bg-white text-slate-900 hover:bg-slate-100"
                    >
                      Personalizar agora
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
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
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="inline-flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
                <CakeSlice className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Lu Festas e Eventos
                </div>
                <div className="text-xs text-slate-600">
                  Confeitaria artesanal
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm leading-relaxed text-slate-600">
              Bolos, doces finos e kits festa para aniversários, casamentos e
              eventos corporativos.
            </div>
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-semibold text-slate-900">Navegação</div>
            {[
              ["Início", "inicio"],
              ["Cardápio", "cardapio"],
              ["Kits", "kits"],
              ["Como funciona", "processo"],
              ["Depoimentos", "depoimentos"],
              ["Contato", "contato"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <span>{label}</span>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </button>
            ))}
          </div>

          <div className="grid gap-3">
            <div className="text-sm font-semibold text-slate-900">Contato</div>
            <SecondaryButton href={buildInstagramLink()} icon={Instagram}>
              @{INSTAGRAM_HANDLE}
            </SecondaryButton>
            <PrimaryButton
              href={buildWhatsAppLink({
                text: "Olá! Quero um orçamento 😊",
              })}
              icon={MessageCircle}
            >
              WhatsApp
            </PrimaryButton>
            <SecondaryButton href={buildMapsLink()} icon={MapPin}>
              Abrir localização
            </SecondaryButton>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-600 md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} Lu Festas e Eventos. Todos os direitos
            reservados.
          </div>
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
              <Clock className="h-4 w-4 text-slate-900" />
              {BUSINESS_HOURS}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href={buildWhatsAppLink({ text: "Olá! Quero um orçamento 😊" })}
        className="group inline-flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
        aria-label="Chamar no WhatsApp"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 transition-all duration-200 group-hover:bg-white/15">
          <MessageCircle className="h-5 w-5" />
        </span>
        <span className="hidden sm:block">Orçar no WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>
    </div>
  );
}

export default function App() {
  const sectionsRef = useRef({});

  useEffect(() => {
    const ids = ["inicio", "cardapio", "kits", "processo", "depoimentos", "contato"];
    const map = {};
    ids.forEach((id) => {
      map[id] = document.getElementById(id);
    });
    sectionsRef.current = map;
  }, []);

  function onNavigate(id) {
    const el = sectionsRef.current?.[id] || document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar onNavigate={onNavigate} />
      <main>
        <Hero onNavigate={onNavigate} />
        <MenuSection />
        <KitsSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer onNavigate={onNavigate} />
      <FloatingCTA />
    </div>
  );
}