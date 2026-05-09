import React, { useEffect, useMemo, useState } from "react";
import "@/App.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster, toast } from "sonner";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Flame,
  Bike,
  Store,
  ShoppingBag,
  Plus,
  Minus,
  MessageCircle,
  Instagram,
  Facebook,
  ChevronRight,
  Award,
  Heart,
  Sparkles,
} from "lucide-react";

const WHATSAPP_BASE = "https://contate.me/556992806024";
const WHATSAPP_NUMBER = "5569992806024";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_c5fda179-e6d0-4166-a9c9-907365203ffa/artifacts/m62vwpav_Captura%20de%20tela%202026-05-08%20203942.png";
const HERO_SHOWCASE =
  "https://customer-assets.emergentagent.com/job_artisan-burger-ph/artifacts/zr59h44w_Captura%20de%20tela%202026-05-08%20210215.png";

const MENU = [
  {
    id: "x-frango",
    name: "X Frango Especial",
    desc: "Filé de frango grelhado, queijo derretido cremoso, ovo, alface fresca e tomate, no pão artesanal macio.",
    price: 16,
    img: "https://customer-assets.emergentagent.com/job_artisan-burger-ph/artifacts/a0vvco3n_Captura%20de%20tela%202026-05-08%20210437.png",
    tag: null,
  },
  {
    id: "salada-especial",
    name: "Salada Especial",
    desc: "Hambúrguer suculento, presunto, queijo, alface, tomate e nossa maionese caseira apimentada inesquecível.",
    price: 17,
    img: "https://customer-assets.emergentagent.com/job_artisan-burger-ph/artifacts/0qzhh56n_Captura%20de%20tela%202026-05-08%20210422.png",
    tag: null,
  },
  {
    id: "turbinado",
    name: "Turbinado",
    desc: "Carne bovina artesanal, presunto, queijo derretido e ovo. Sequinho e turbinado de sabor.",
    price: 18,
    img: "https://customer-assets.emergentagent.com/job_artisan-burger-ph/artifacts/mwt4k307_Captura%20de%20tela%202026-05-08%20210511.png",
    tag: null,
  },
  {
    id: "bagunca",
    name: "Bagunça",
    desc: "Pão, hambúrguer, calabresa, presunto, queijo derretido, ovo e bacon crocante. A bagunça boa de comer!",
    price: 19,
    img: "https://customer-assets.emergentagent.com/job_artisan-burger-ph/artifacts/rdopdwqk_Captura%20de%20tela%202026-05-08%20210454.png",
    tag: "TOP",
  },
  {
    id: "x-tudo",
    name: "X-Tudo",
    desc: "Hambúrguer, calabresa, frango, presunto, queijo, ovo, alface, tomate e maionese caseira. Tudo de bom!",
    price: 21,
    img: "https://customer-assets.emergentagent.com/job_artisan-burger-ph/artifacts/wc4wcltj_Captura%20de%20tela%202026-05-08%20210305.png",
    tag: "MAIS PEDIDO",
  },
  {
    id: "super-carga",
    name: "Super Carga",
    desc: "O monstro da casa: 2 hambúrgueres, calabresa, frango, presunto, queijo, ovo, bacon, batata palha, milho e três molhos.",
    price: 36,
    img: "https://customer-assets.emergentagent.com/job_artisan-burger-ph/artifacts/0jv6dk67_Captura%20de%20tela%202026-05-08%20210404.png",
    tag: "PREMIUM",
  },
  {
    id: "batata-frita",
    name: "Batata Frita",
    desc: "Porção generosa de batata frita crocante por fora, macia por dentro. Acompanha maionese caseira.",
    price: 15,
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
    tag: null,
  },
  {
    id: "refrigerante",
    name: "Refrigerante",
    desc: "Lata 350ml gelada para acompanhar seu lanche. Coca-Cola, Guaraná, Fanta ou Sprite.",
    price: 7,
    img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
    tag: null,
  },
];

const ADICIONAIS = [
  { id: "bacon", name: "Bacon Extra", price: 4 },
  { id: "queijo", name: "Queijo Extra", price: 3 },
  { id: "ovo", name: "Ovo", price: 2 },
  { id: "calabresa", name: "Calabresa", price: 4 },
  { id: "cheddar", name: "Cheddar Cremoso", price: 4 },
  { id: "catupiry", name: "Catupiry", price: 3 },
  { id: "maionese", name: "Maionese Caseira Apimentada", price: 2 },
  { id: "frango", name: "Frango Desfiado", price: 4 },
];

const REVIEWS = [
  { name: "Carlos M.", text: "Lanche gostoso e preço bom. Já virou meu favorito da cidade!", stars: 5 },
  { name: "Ana P.", text: "Os lanches são ótimos e o atendimento é nota 10. Recomendo demais!", stars: 5 },
  { name: "João R.", text: "Lanche bem sequinho, maionese maravilhosa. Vou pedir de novo!", stars: 5 },
  { name: "Marina S.", text: "Comidas nota 1000! Entrega rápida e tudo quentinho.", stars: 5 },
  { name: "Pedro L.", text: "Maionese caseira apimentada é sensacional. Melhor de Porto Velho!", stars: 5 },
  { name: "Júlia T.", text: "Atendimento impecável e o sabor… ai meu Deus, voltarei sempre!", stars: 5 },
];

const SCHEDULE = [
  { day: "Domingo", short: "DOM", hours: "18:30 – 00:00", idx: 0 },
  { day: "Segunda-feira", short: "SEG", hours: "18:30 – 00:00", idx: 1 },
  { day: "Terça-feira", short: "TER", hours: "18:30 – 00:00", idx: 2 },
  { day: "Quarta-feira", short: "QUA", hours: "Fechado", idx: 3, closed: true },
  { day: "Quinta-feira", short: "QUI", hours: "18:30 – 00:00", idx: 4 },
  { day: "Sexta-feira", short: "SEX", hours: "18:30 – 00:00", idx: 5 },
  { day: "Sábado", short: "SAB", hours: "18:30 – 00:00", idx: 6 },
];

const isOpenNow = () => {
  const now = new Date();
  const day = now.getDay();
  if (day === 3) return false; // quarta
  const h = now.getHours();
  const m = now.getMinutes();
  const minutes = h * 60 + m;
  // 18:30 (1110) até 23:59 (1439) OU 00:00 ainda do dia anterior já cobrado
  return minutes >= 18 * 60 + 30 || minutes < 1; // simplificado: 18:30 → 23:59
};

const formatBRL = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const buildWhatsappLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// ---------- Counter ----------
const Counter = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(end / (duration / 16)));
    const t = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(t);
      }
      setCount(start);
    }, 16);
    return () => clearInterval(t);
  }, [end]);
  return (
    <div className="flex flex-col items-center text-center min-w-0 px-2">
      <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-yellow-400 leading-none whitespace-nowrap">
        {count.toLocaleString("pt-BR")}{suffix}
      </span>
      <span className="mt-2 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-zinc-400">{label}</span>
    </div>
  );
};

// ---------- Customization Dialog ----------
const CustomizeDialog = ({ open, onOpenChange, item }) => {
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState({});
  const [obs, setObs] = useState("");
  const [mode, setMode] = useState("entrega");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      setQty(1);
      setSelected({});
      setObs("");
      setMode("entrega");
      setAddress("");
      setNeighborhood("");
      setName("");
    }
  }, [open, item]);

  const totals = useMemo(() => {
    if (!item) return { addons: 0, subtotal: 0 };
    const addons = ADICIONAIS.reduce(
      (sum, a) => sum + (selected[a.id] ? a.price : 0),
      0
    );
    const subtotal = (item.price + addons) * qty;
    return { addons, subtotal };
  }, [selected, qty, item]);

  if (!item) return null;

  const sendOrder = () => {
    if (mode === "entrega" && !address.trim()) {
      toast.error("Por favor informe o endereço de entrega.");
      return;
    }
    const chosen = ADICIONAIS.filter((a) => selected[a.id]);
    const lines = [
      "*🍔 NOVO PEDIDO — HURTADO'S BURGER'S*",
      "",
      `*Item:* ${item.name}`,
      `*Quantidade:* ${qty}x`,
      `*Valor unitário:* ${formatBRL(item.price)}`,
    ];
    if (chosen.length) {
      lines.push("");
      lines.push("*Adicionais:*");
      chosen.forEach((a) => lines.push(`• ${a.name} (+${formatBRL(a.price)})`));
    }
    if (obs.trim()) {
      lines.push("");
      lines.push(`*Observações:* ${obs.trim()}`);
    }
    lines.push("");
    lines.push(`*Modalidade:* ${mode === "entrega" ? "🛵 Entrega" : mode === "retirada" ? "🏃 Retirada na porta" : "🍽️ Consumo no local"}`);
    if (mode === "entrega" && address) lines.push(`*Endereço:* ${address}`);
    if (mode === "entrega" && neighborhood.trim()) lines.push(`*Bairro:* ${neighborhood.trim()}`);
    if (name.trim()) lines.push(`*Nome:* ${name.trim()}`);
    lines.push("");
    lines.push(`*SUBTOTAL: ${formatBRL(totals.subtotal)}*`);
    if (mode === "entrega") {
      lines.push("");
      lines.push("👉 *Pode me informar a taxa de entrega para esse endereço, por favor?*");
    }
    lines.push("");
    lines.push("_Pedido gerado pelo site oficial._");

    const url = buildWhatsappLink(lines.join("\n"));
    window.open(url, "_blank");
    toast.success("Abrindo WhatsApp com seu pedido!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="customize-dialog"
        className="max-w-2xl bg-zinc-950 border border-zinc-800 text-white p-0 overflow-hidden max-h-[92vh] flex flex-col"
      >
        <div className="relative h-44 md:h-56 overflow-hidden">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-3 left-5 right-5">
            <p className="text-yellow-400 text-xs uppercase tracking-widest font-bebas">Personalize seu pedido</p>
            <h3 className="font-display text-2xl md:text-3xl">{item.name}</h3>
            <p className="text-zinc-300 text-sm mt-1 line-clamp-2 max-w-xl">{item.desc}</p>
          </div>
        </div>

        <div className="px-6 py-5 overflow-y-auto scrollbar-hide flex-1">
          <DialogHeader className="sr-only">
            <DialogTitle>Personalizar {item.name}</DialogTitle>
            <DialogDescription>Adicione opcionais e observações.</DialogDescription>
          </DialogHeader>

          {/* Quantity */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <p className="font-bebas text-xl">Quantidade</p>
              <p className="text-xs text-zinc-500">Quantos você quer?</p>
            </div>
            <div className="flex items-center gap-3 bg-zinc-900 rounded-full p-1 border border-zinc-800">
              <button
                data-testid="qty-decrease"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-yellow-500 hover:text-black transition flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-display text-xl min-w-[28px] text-center">{qty}</span>
              <button
                data-testid="qty-increase"
                onClick={() => setQty(qty + 1)}
                className="w-9 h-9 rounded-full bg-yellow-500 text-black hover:bg-yellow-400 transition flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Adicionais */}
          <div className="py-5 border-b border-zinc-800">
            <div className="flex items-baseline justify-between mb-3">
              <p className="font-bebas text-xl">Adicionais <span className="text-yellow-400 text-sm">(opcional)</span></p>
              <span className="text-xs text-zinc-500">Turbine seu lanche</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ADICIONAIS.map((a) => (
                <label
                  key={a.id}
                  htmlFor={`add-${a.id}`}
                  data-testid={`adicional-${a.id}`}
                  className={`flex items-center justify-between gap-3 px-3 py-3 rounded-lg border cursor-pointer transition ${
                    selected[a.id]
                      ? "bg-yellow-500/10 border-yellow-500/60"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`add-${a.id}`}
                      checked={!!selected[a.id]}
                      onCheckedChange={(c) => setSelected({ ...selected, [a.id]: !!c })}
                      className="border-zinc-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500 data-[state=checked]:text-black"
                    />
                    <span className="text-sm">{a.name}</span>
                  </div>
                  <span className="text-yellow-400 text-sm font-semibold">+{formatBRL(a.price)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Modalidade */}
          <div className="py-5 border-b border-zinc-800">
            <p className="font-bebas text-xl mb-3">Como você quer receber?</p>
            <RadioGroup value={mode} onValueChange={setMode} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { v: "entrega", label: "Entrega", icon: Bike },
                { v: "retirada", label: "Retirada", icon: ShoppingBag },
                { v: "local", label: "No local", icon: Store },
              ].map((m) => (
                <label
                  key={m.v}
                  htmlFor={`mode-${m.v}`}
                  data-testid={`mode-${m.v}`}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg border cursor-pointer transition ${
                    mode === m.v
                      ? "bg-orange-500/10 border-orange-500/60"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <RadioGroupItem value={m.v} id={`mode-${m.v}`} className="border-zinc-600 text-orange-500" />
                  <m.icon className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">{m.label}</span>
                </label>
              ))}
            </RadioGroup>

            {mode === "entrega" && (
              <div className="mt-3 space-y-3">
                <div>
                  <Label htmlFor="address" className="text-xs text-zinc-400 uppercase tracking-wide">Endereço de entrega</Label>
                  <Textarea
                    id="address"
                    data-testid="input-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rua, número, complemento, ponto de referência..."
                    className="mt-1 bg-zinc-900 border-zinc-800 text-white resize-none min-h-[60px] focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <Label htmlFor="neighborhood" className="text-xs text-zinc-400 uppercase tracking-wide">Bairro</Label>
                  <input
                    id="neighborhood"
                    data-testid="input-neighborhood"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Agenor M. de Carvalho"
                    className="mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 items-start bg-orange-500/10 border border-orange-500/30 rounded-lg px-3 py-2.5">
                  <Bike className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-200 leading-relaxed">
                    A <b>taxa de entrega</b> varia conforme o bairro e será confirmada pelo atendente no WhatsApp.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Nome + Observações */}
          <div className="py-5">
            <Label htmlFor="cust-name" className="text-xs text-zinc-400 uppercase tracking-wide">Seu nome (opcional)</Label>
            <input
              id="cust-name"
              data-testid="input-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como podemos te chamar?"
              className="mt-1 mb-4 w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-yellow-500 focus:outline-none"
            />
            <Label htmlFor="obs" className="text-xs text-zinc-400 uppercase tracking-wide">Observações</Label>
            <Textarea
              id="obs"
              data-testid="input-observations"
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              placeholder="Ex: sem cebola, ponto da carne, alguma alergia..."
              className="mt-1 bg-zinc-900 border-zinc-800 text-white resize-none min-h-[64px] focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
        </div>

        <DialogFooter className="bg-zinc-900/80 border-t border-zinc-800 px-6 py-4 flex-row sm:flex-row items-center justify-between gap-3 backdrop-blur">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Total</p>
            <p className="font-display text-2xl text-yellow-400">{formatBRL(totals.subtotal)}</p>
          </div>
          <Button
            data-testid="send-order-whatsapp"
            onClick={sendOrder}
            className="btn-fire text-white font-bold rounded-full px-6 py-6 text-base"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Enviar pelo WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ---------- Sections ----------
const Header = ({ onMenu }) => (
  <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/70 border-b border-zinc-900">
    <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
      <a href="#hero" className="flex items-center gap-2" data-testid="header-logo">
        <img src={LOGO_URL} alt="Hurtado's Burger's" className="h-12 w-12 object-cover rounded-full border-2 border-yellow-500" />
        <div className="leading-tight hidden sm:block">
          <p className="font-display text-base text-white">Hurtado's</p>
          <p className="font-bebas text-xs text-yellow-400 -mt-1">BURGER'S</p>
        </div>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm">
        <a href="#cardapio" className="text-zinc-300 hover:text-yellow-400 transition" data-testid="nav-cardapio">Cardápio</a>
        <a href="#mais-pedidos" className="text-zinc-300 hover:text-yellow-400 transition" data-testid="nav-mais-pedidos">Mais Pedidos</a>
        <a href="#avaliacoes" className="text-zinc-300 hover:text-yellow-400 transition" data-testid="nav-avaliacoes">Avaliações</a>
        <a href="#contato" className="text-zinc-300 hover:text-yellow-400 transition" data-testid="nav-contato">Contato</a>
      </nav>
      <Button
        data-testid="header-cta"
        onClick={onMenu}
        className="btn-yellow rounded-full font-bold px-4 md:px-5 py-2 text-xs md:text-sm"
      >
        <MessageCircle className="w-4 h-4 mr-1.5" />
        <span className="hidden sm:inline">Pedir Agora</span>
        <span className="sm:hidden">Pedir</span>
      </Button>
    </div>
  </header>
);

const Hero = ({ onMenu }) => (
  <section id="hero" className="relative pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden">
    <div className="absolute inset-0 flame-glow pointer-events-none" />
    <div className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-orange-600/20 blur-[100px]" />
    <div className="absolute top-40 -left-32 w-[400px] h-[400px] rounded-full bg-red-600/20 blur-[100px]" />

    <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1 mb-5">
          <Flame className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-xs font-bebas tracking-widest text-yellow-400">Porto Velho • RO</span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-5">
          O hambúrguer mais
          <span className="block text-yellow-400">apetitoso</span>
          <span className="block text-orange-500">da cidade.</span>
        </h1>
        <p className="text-zinc-400 text-base md:text-lg max-w-lg mb-8">
          Lanches saborosos, atendimento rápido e nossa <span className="text-yellow-400 font-semibold">maionese caseira inesquecível</span>. Peça agora e prove você mesmo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            data-testid="hero-cta-pedir"
            onClick={onMenu}
            className="btn-fire text-white font-bold rounded-full px-7 py-7 text-base"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Fazer Pedido no WhatsApp
          </Button>
          <a href="#cardapio">
            <Button
              variant="outline"
              data-testid="hero-cta-cardapio"
              className="rounded-full px-7 py-7 text-base bg-transparent border-zinc-700 text-white hover:bg-zinc-900 hover:border-yellow-500"
            >
              Ver Cardápio
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
        <div className="flex items-center gap-6 mt-8 pt-6 border-t border-zinc-900">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-sm text-zinc-300"><b className="text-yellow-400">4,9</b> · 30 avaliações</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-400">
            <span className={`w-2 h-2 rounded-full ${isOpenNow() ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            {isOpenNow() ? "Aberto agora · até 00:00" : "Fechado no momento"}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-orange-600/40 to-yellow-500/30 blur-3xl" />
        <div className="relative floaty">
          <img src={HERO_SHOWCASE} alt="Hambúrgueres Hurtado's" className="relative w-full rounded-3xl shadow-2xl border border-zinc-800" />
          <div className="absolute -bottom-5 -left-5 bg-yellow-400 text-black px-4 py-3 rounded-2xl shadow-2xl rotate-[-4deg]">
            <p className="font-display text-2xl leading-none">100%</p>
            <p className="font-bebas text-[10px] tracking-widest">ARTESANAL</p>
          </div>
          <div className="absolute -top-5 -right-3 bg-red-600 text-white px-4 py-3 rounded-2xl shadow-2xl rotate-[5deg]">
            <p className="font-display text-2xl leading-none flex items-center gap-1"><Flame className="w-5 h-5" /> Quente</p>
            <p className="font-bebas text-[10px] tracking-widest">DA CHAPA</p>
          </div>
        </div>
      </div>
    </div>

    {/* Marquee */}
    <div className="mt-14 border-y border-yellow-500/20 bg-yellow-500/5 overflow-hidden py-4">
      <div className="flex marquee whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex items-center gap-10 pr-10">
            {["Maionese caseira apimentada", "Atendimento nota 10", "Entrega rápida", "Lanche sequinho", "Sabor inesquecível", "Preço justo"].map((t, i) => (
              <span key={i} className="font-bebas text-2xl text-yellow-400/80 flex items-center gap-3">
                {t}
                <Flame className="w-5 h-5 text-orange-500" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="sobre" className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="max-w-3xl">
        <p className="font-bebas text-yellow-400 text-sm tracking-[0.3em] mb-3">SOBRE A CASA</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6">
          Sabor que vira <span className="text-orange-500">paixão</span>.
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
          Em Porto Velho, a Hurtado's Burger's nasceu da obsessão por um lanche realmente bem feito: pão fresquinho, carne suculenta na chapa, e a maionese caseira apimentada que virou marca registrada da casa.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Award, title: "Atendimento nota 10", desc: "Rápido e atencioso" },
          { icon: Flame, title: "Maionese caseira", desc: "Apimentada, inesquecível" },
          { icon: Bike, title: "Entrega rápida", desc: "Quentinho na sua porta" },
          { icon: Heart, title: "Custo-benefício", desc: "Preço que cabe no bolso" },
        ].map((f, i) => (
          <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-yellow-500/40 transition">
            <f.icon className="w-7 h-7 text-yellow-400 mb-3" />
            <p className="font-semibold text-sm">{f.title}</p>
            <p className="text-xs text-zinc-500 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MaisPedidos = ({ onPick }) => {
  const tops = MENU.filter((m) => ["x-tudo", "super-carga", "bagunca"].includes(m.id));
  return (
    <section id="mais-pedidos" className="py-20 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="font-bebas text-yellow-400 text-sm tracking-[0.3em] mb-2">⭐ MAIS PEDIDOS</p>
            <h2 className="font-display text-4xl md:text-5xl">Os queridinhos da casa</h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm">Os campeões de pedido. Se ainda não experimentou, está na hora.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {tops.map((it) => (
            <div
              key={it.id}
              className="card-burger rounded-3xl overflow-hidden relative group cursor-pointer"
              onClick={() => onPick(it)}
              data-testid={`top-${it.id}`}
            >
              <div className="absolute top-4 left-4 z-10 tag-popular text-white text-[10px] font-bebas tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {it.tag}
              </div>
              <div className="aspect-[4/3] overflow-hidden bg-black">
                <img src={it.img} alt={it.name} className="burger-img w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl mb-1">{it.name}</h3>
                <p className="text-zinc-500 text-xs line-clamp-2 mb-3">{it.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-yellow-400">{formatBRL(it.price)}</span>
                  <Button size="sm" className="btn-fire rounded-full text-white text-xs">Pedir Agora</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cardapio = ({ onPick }) => (
  <section id="cardapio" className="py-20">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <p className="font-bebas text-yellow-400 text-sm tracking-[0.3em] mb-2">NOSSO CARDÁPIO</p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">Escolha o seu <span className="text-orange-500">favorito</span></h2>
        <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-xl mx-auto">Toque em "Pedir Agora" para personalizar com adicionais e enviar direto pro nosso WhatsApp.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {MENU.map((it) => (
          <div
            key={it.id}
            className="card-burger rounded-2xl overflow-hidden flex flex-col"
            data-testid={`menu-card-${it.id}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              {it.tag && (
                <span className="absolute top-3 right-3 z-10 tag-popular text-white text-[9px] font-bebas tracking-widest px-2 py-0.5 rounded-full">{it.tag}</span>
              )}
              <img src={it.img} alt={it.name} className="burger-img w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-display text-lg leading-tight">{it.name}</h3>
              <p className="text-zinc-500 text-xs mt-1.5 mb-4 line-clamp-2 flex-1">{it.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl text-yellow-400">{formatBRL(it.price)}</span>
                <Button
                  size="sm"
                  data-testid={`pedir-${it.id}`}
                  onClick={() => onPick(it)}
                  className="btn-fire rounded-full text-white text-xs px-4"
                >
                  Pedir Agora
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section id="avaliacoes" className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black relative">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <p className="font-bebas text-yellow-400 text-sm tracking-[0.3em] mb-2">QUEM PROVOU, APROVOU</p>
        <h2 className="font-display text-4xl md:text-5xl">Avaliações reais</h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="font-display text-3xl text-yellow-400">4,9</span>
          <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
          <span className="text-zinc-500 text-sm ml-2">com 30+ avaliações</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REVIEWS.map((r, i) => (
          <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500/40 transition" data-testid={`review-${i}`}>
            <div className="flex mb-3">{[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
            <p className="text-zinc-300 leading-relaxed mb-4">"{r.text}"</p>
            <p className="text-yellow-400 font-bebas tracking-wide text-sm">— {r.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DeliveryInfo = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-10">
        <p className="font-bebas text-yellow-400 text-sm tracking-[0.3em] mb-2">COMO RECEBER</p>
        <h2 className="font-display text-4xl md:text-5xl">Do seu jeito</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { icon: Store, title: "No Local", desc: "Ambiente acolhedor pra curtir seu lanche fresquinho.", color: "from-yellow-600/20 to-yellow-900/0" },
          { icon: ShoppingBag, title: "Retirada na Porta", desc: "Pediu, chegou, pegou. Rápido e prático.", color: "from-orange-600/20 to-orange-900/0" },
          { icon: Bike, title: "Entrega sem contato", desc: "Quentinho até sua porta com toda segurança.", color: "from-red-600/20 to-red-900/0" },
        ].map((d, i) => (
          <div key={i} className={`relative bg-gradient-to-br ${d.color} bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500/40 transition group`}>
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-black transition">
              <d.icon className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl mb-2">{d.title}</h3>
            <p className="text-zinc-400 text-sm">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contato = () => (
  <section id="contato" className="py-20 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <p className="font-bebas text-yellow-400 text-sm tracking-[0.3em] mb-2">VENHA NOS VISITAR</p>
        <h2 className="font-display text-4xl md:text-5xl">Onde estamos</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: MapPin, title: "Endereço", text: "R. Gov. Ari Marcos, 1351\nAgenor M. de Carvalho\nPorto Velho - RO" },
            { icon: Phone, title: "Telefone / WhatsApp", text: "(69) 99280-6024" },
          ].map((c, i) => (
            <div key={i} className="flex gap-4 bg-black border border-zinc-800 rounded-2xl p-5">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                <c.icon className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="font-bebas text-yellow-400 tracking-wide text-sm">{c.title}</p>
                <p className="text-white whitespace-pre-line text-base mt-0.5">{c.text}</p>
              </div>
            </div>
          ))}

          <div className="bg-black border border-zinc-800 rounded-2xl p-5">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="font-bebas text-yellow-400 tracking-wide text-sm">Horário de funcionamento</p>
                  <span
                    data-testid="status-pill"
                    className={`text-[10px] font-bebas tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1.5 ${
                      isOpenNow()
                        ? "bg-green-500/15 text-green-400 border border-green-500/30"
                        : "bg-red-500/15 text-red-400 border border-red-500/30"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow() ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                    {isOpenNow() ? "ABERTO AGORA" : "FECHADO"}
                  </span>
                </div>
                <ul className="mt-3 divide-y divide-zinc-900">
                  {SCHEDULE.map((s) => {
                    const isToday = s.idx === new Date().getDay();
                    return (
                      <li
                        key={s.day}
                        className={`flex items-center justify-between py-2 text-sm ${
                          isToday ? "text-yellow-400 font-semibold" : "text-zinc-300"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isToday && <span className="w-1 h-1 rounded-full bg-yellow-400" />}
                          {s.day}
                        </span>
                        <span className={s.closed ? "text-red-400" : ""}>{s.hours}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <a href={WHATSAPP_BASE} target="_blank" rel="noreferrer" data-testid="contato-whatsapp">
            <Button className="btn-fire w-full rounded-full text-white py-6 mt-2">
              <MessageCircle className="w-5 h-5 mr-2" /> Chamar no WhatsApp
            </Button>
          </a>
        </div>
        <div className="rounded-3xl overflow-hidden border border-zinc-800 min-h-[400px]">
          <iframe
            title="Hurtado's Burger's"
            src="https://www.google.com/maps?q=R.+Gov.+Ari+Marcos,+1351+-+Agenor+M.+de+Carvalho,+Porto+Velho+-+RO&output=embed"
            className="w-full h-full min-h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black border-t border-zinc-900 py-12">
    <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <img src={LOGO_URL} alt="Hurtado's" className="h-14 w-14 rounded-full border-2 border-yellow-500" />
          <div>
            <p className="font-display text-lg">Hurtado's</p>
            <p className="font-bebas text-xs text-yellow-400 -mt-1">BURGER'S</p>
          </div>
        </div>
        <p className="text-zinc-500 text-sm">A hamburgueria mais saborosa de Porto Velho. Sabor que vira paixão.</p>
      </div>
      <div>
        <p className="font-bebas text-yellow-400 tracking-widest text-sm mb-3">SIGA A GENTE</p>
        <div className="flex gap-3">
          {[
            { Icon: Instagram, href: "https://www.instagram.com/hurtadosburgers/", label: "instagram" },
            { Icon: MessageCircle, href: WHATSAPP_BASE, label: "whatsapp" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              data-testid={`social-${label}`}
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 flex items-center justify-center transition"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        <a
          href="https://www.instagram.com/hurtadosburgers/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-zinc-400 hover:text-yellow-400 text-sm transition"
          data-testid="footer-instagram-handle"
        >
          <Instagram className="w-4 h-4" />
          @hurtadosburgers
        </a>
      </div>
      <div>
        <p className="font-bebas text-yellow-400 tracking-widest text-sm mb-3">HORÁRIO</p>
        <p className="text-zinc-400 text-sm">Ter — Dom: 18:30 – 00:00</p>
        <p className="text-zinc-500 text-xs mt-1">Quarta-feira: <span className="text-red-400">Fechado</span></p>
        <p className="text-zinc-500 text-xs mt-3">© {new Date().getFullYear()} Hurtado's Burger's. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

const FloatingWhats = () => (
  <a
    href={WHATSAPP_BASE}
    target="_blank"
    rel="noreferrer"
    data-testid="floating-whatsapp"
    className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl whats-pulse hover:bg-green-400 transition"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

// ---------- App ----------
function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const onPick = (item) => {
    setActive(item);
    setOpen(true);
  };

  const goMenu = () => {
    document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App bg-black text-white min-h-screen">
      <Toaster theme="dark" position="top-center" richColors />
      <Header onMenu={goMenu} />
      <main>
        <Hero onMenu={goMenu} />
        <About />
        <MaisPedidos onPick={onPick} />
        <Cardapio onPick={onPick} />
        <Reviews />
        <DeliveryInfo />
        <Contato />
      </main>
      <Footer />
      <FloatingWhats />
      <CustomizeDialog open={open} onOpenChange={setOpen} item={active} />
    </div>
  );
}

export default App;
