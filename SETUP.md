# BIOSITE PRO 2.0 — MANUAL DE IMPLANTAÇÃO E PRODUÇÃO

Bem-vindo ao **BioSite Pro 2.0**, a plataforma SaaS definitiva para criação, personalização e exportação de biosites profissionais e cinematográficos.

---

## 1. ARQUITETURA DO SISTEMA

- **Frontend & Editor:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Brand Icons.
- **Autenticação:** Firebase Authentication (E-mail e Senha).
- **Banco de Dados em Tempo Real:** Cloud Firestore com regras de segurança ativas (RBAC).
- **Proteção:** Firebase App Check com reCAPTCHA Enterprise / Debug Token.
- **Exportação Independente:** Geração local de pacotes ZIP com `JSZip`, contendo HTML autocontido sem dependências do BioSite Pro.

---

## 2. REQUISITOS E VARIÁVEIS DE AMBIENTE

Crie um arquivo `.env` na raiz do projeto com as seguintes chaves do seu projeto Firebase:

```env
VITE_FIREBASE_API_KEY="sua-api-key"
VITE_FIREBASE_AUTH_DOMAIN="seu-projeto.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="seu-projeto"
VITE_FIREBASE_STORAGE_BUCKET="seu-projeto.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="seu-sender-id"
VITE_FIREBASE_APP_ID="seu-app-id"
VITE_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"

# Opcional (ReCAPTCHA v3 ou Enterprise para App Check)
VITE_RECAPTCHA_SITE_KEY=""
```

> **Nota:** Em ambiente AI Studio, as credenciais já são carregadas automaticamente de `firebase-applet-config.json` ou variáveis de ambiente injetadas.

---

## 3. CONFIGURAÇÃO DO PRIMEIRO ADMINISTRADOR

O sistema possui uma trava de segurança baseada em UID e e-mail master:

1. O e-mail padrão do administrador é: `jeanncarllosmkt@gmail.com`.
2. Quando este usuário se cadastra ou faz login, o sistema automaticamente reconhece e aplica:
   - `role: "admin"`
   - `status: "aprovado"`
3. No painel do administrador (`/admin`), o administrador master pode:
   - Ver a lista completa de usuários cadastrados;
   - Aprovar novos cadastros de clientes;
   - Rejeitar solicitações de acesso;
   - Bloquear e desbloquear contas;
   - Acompanhar estatísticas em tempo real (Total de usuários, Pendentes, Aprovados, Rejeitados, Bloqueados).

---

## 4. FLUXO DE ACESSO DO USUÁRIO

1. **Cadastro (`/register`):** O usuário preenche Nome, E-mail e Senha (mínimo de 6 caracteres).
2. **Tela "Cadastro Recebido":** O status inicial do usuário é `pendente`. Ele vê uma tela informando que sua conta está em análise pela equipe.
3. **Aprovação:** O administrador acessa o Painel Admin e clica em **Aprovar**.
4. **Login e Acesso Liberado:** Ao revalidar o status ou fazer login, o usuário é redirecionado imediatamente para o Dashboard, liberando:
   - Criação de novos projetos;
   - Escolha entre os 10 Nichos e 100 Modelos;
   - Editor visual completo em tempo real;
   - Download de biosites em ZIP sem marcas d'água.

---

## 5. CATÁLOGO DE 10 NICHOS E 100 MODELOS

| # | Nicho | Quantidade de Modelos |
|---|---|---|
| 01 | Barbearia & Barber Club | 10 Modelos Exclusivos (01 a 10) |
| 02 | Tatuagem & Body Art | 10 Modelos Exclusivos (01 a 10) |
| 03 | Estética & Harmonização | 10 Modelos Exclusivos (01 a 10) |
| 04 | Restaurantes, Bares & Gastronomia | 10 Modelos Exclusivos (01 a 10) |
| 05 | Personal Trainer & Consultoria Fitness | 10 Modelos Exclusivos (01 a 10) |
| 06 | Advocacia & Consultoria Jurídica | 10 Modelos Exclusivos (01 a 10) |
| 07 | Imobiliárias & Corretores de Luxo | 10 Modelos Exclusivos (01 a 10) |
| 08 | Odontologia & Estética Dental | 10 Modelos Exclusivos (01 a 10) |
| 09 | Salão de Beleza, Cabelos & Make | 10 Modelos Exclusivos (01 a 10) |
| 10 | Psicologia, Terapia & Saúde Mental | 10 Modelos Exclusivos (01 a 10) |

**Total:** 100 templates distintos com fotos em alta definição, layout cinematográfico, serviços cadastrados e paletas de cores refinadas.

---

## 6. COMO OS BIOSITES EXPORTADOS FUNCIONAM

Quando o usuário clica em **⬇ BAIXAR BIOSITE**:
1. O construtor compila um arquivo `index.html` estático e autocontido com CSS embutido, SVGs otimizados e zero dependências de bibliotecas externas pesadas.
2. O arquivo gerado não contém nenhuma referência ao Firebase, credenciais, banco de dados ou painéis do BioSite Pro.
3. É gerado um arquivo `vercel.json` pronto com cabeçalhos de segurança (XSS, Clickjacking protection).
4. É gerado um arquivo `README.txt` com passo a passo ilustrado para hospedar gratuitamente na Vercel, Netlify ou qualquer servidor cPanel/FTP.
5. O pacote é empacotado em `nome-do-biosite.zip` e baixado instantaneamente pelo navegador.

---

## 7. COMANDOS ÚTEIS

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (Porta 3000)
npm run dev

# Validar TypeScript e Build de Produção
npm run build
```

---
BioSite Pro 2.0 — Desenvolvido para máxima conversão, velocidade e estética premium.
