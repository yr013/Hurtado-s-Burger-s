# Hurtado's Burger's — Landing Page

## Original Problem Statement
Site moderno, responsivo e profissional para a hamburgueria "Hurtado's Burger's", em Porto Velho - RO. Tema escuro com vermelho/amarelo/laranja, focado em conversão para WhatsApp.

## User Choices
- WhatsApp: (69) 99280-6024 — link https://contate.me/556992806024
- Tipo: Site estático (landing page) — sem backend
- Logo enviado pelo usuário (amarelo "Hurtado's Burger's")
- Imagens reais dos lanches enviadas pelo usuário
- Foto destaque (4 burgers) usada no Hero
- Modal estilo iFood com personalização (adicionais opcionais, observações, modalidade de entrega) que dispara mensagem detalhada no WhatsApp

## Architecture
- Frontend: React + shadcn/ui (Dialog, Checkbox, RadioGroup, Textarea, Button), Tailwind, Lucide icons, Sonner toasts
- Sem backend — site 100% estático, todas interações terminam no WhatsApp
- Fontes: Bowlby One SC (display), Bebas Neue (accents), Manrope (body)

## Implemented (2026-12-09)
- Hero com foto-destaque dos 4 burgers + slogan + CTAs
- Marquee animado com diferenciais
- Sobre a casa + contador animado (avaliações, clientes, nota)
- Seção "Os Mais Pedidos" (X-Tudo, Super Carga, Bagunça)
- Cardápio completo com 8 itens (cards com hover, tag "TOP/PREMIUM")
- Modal de personalização estilo iFood:
  - Quantidade ± 
  - 8 adicionais opcionais (bacon, queijo, ovo, calabresa, cheddar, catupiry, maionese caseira, frango)
  - Modalidade: entrega/retirada/local
  - Endereço (se entrega), nome, observações
  - Total dinâmico
  - Geração de mensagem formatada e envio para WhatsApp
- Avaliações com nota 4,9⭐
- Seção delivery (3 modalidades)
- Contato com mapa Google embed
- Footer com redes sociais
- Botão flutuante WhatsApp com pulse animation
- SEO básico (meta tags, og tags, title)

## Backlog (P1/P2)
- P1: Campanha de cupom (ex: PRIMEIRA10) que aplica desconto no pedido
- P1: Combo builder (lanche + batata + refri com desconto)
- P2: Galeria de fotos do salão
- P2: Programa de fidelidade simples
- P2: Cardápio com filtros (sem glúten, vegetariano)
