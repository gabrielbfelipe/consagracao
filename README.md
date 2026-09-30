# Consagração a Nossa Senhora

Um santuário digital para a preparação de 33 dias da Consagração Total, segundo
o método de São Luís Maria Grignion de Montfort.

> Você escolhe a data. O sistema prepara o caminho. Você vive a jornada.

## O que é

A pessoa escolhe uma festa mariana, e o sistema calcula o dia exato de começar —
33 dias antes — e conduz a preparação dia a dia, em sete passos: preparar-se,
ler, meditar, rezar, refletir, praticar e registrar.

## Sobre o livro

Esta aplicação **não reproduz** o *Tratado da Verdadeira Devoção*. A obra de
Montfort é de domínio público no original, mas as traduções ao português
pertencem às editoras e aos tradutores que as fizeram. O sistema funciona como
companheiro de leitura: indica os parágrafos a ler no exemplar que a pessoa
adquire, e oferece anotações, marcações e comentários próprios.

Pela mesma razão, as traduções das orações aqui presentes são próprias, feitas a
partir do latim, com o original ao lado para conferência.

## Estado do conteúdo

Nada em `src/content/` deve ir a produção sem revisão pastoral.

- Dias escritos: 1, 2, 13, 20 e 27 — um por etapa da jornada. Faltam 28.
- Traduções das orações: feitas, **não revisadas**.
- Fórmula da consagração: **não transcrita**. Uma oração que se reza uma vez na
  vida não pode sair aproximada de memória; ela deve ser copiada de uma edição
  impressa e conferida.
- Política de privacidade: escrita, **pendente de revisão jurídica**.

## Tecnologia

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Supabase (Postgres com RLS,
Auth por link de e-mail) · Motion · Vercel.

### Decisões que valem saber

**A luz é o estado.** Um dia concluído não fica verde nem ganha um símbolo de
conferido: ele fica *iluminado*. Os 33 dias são uma colunata de arcos que vai
acendendo.

**A carta do primeiro dia é lacrada pelo banco.** A política de leitura só
entrega o texto quando a data da consagração chega *no fuso da própria pessoa*.
Não é regra de tela — quem consultar a API com o próprio token também não
alcança a carta antes da hora.

**Datas são datas de calendário, não instantes.** Toda a aritmética roda em UTC
para que o horário de verão nunca empurre um dia, e o "hoje" de cada pessoa vem
do fuso do seu perfil.

**LGPD.** Convicção religiosa é dado sensível. O consentimento é explícito,
registrado com hora, e apagar a conta apaga tudo em cascata.

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # e preencha
npm run migrar               # aplica o esquema no Supabase
npm run dev
```

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm test` | Testes do motor de cronograma |
| `npm run migrar` | Aplica as migrações em `supabase/migrations` |
| `npm run verificar:rls` | Prova o isolamento entre contas contra o banco real |
| `npm run publicar` | Publica na Vercel |

O `verificar:rls` cria duas contas de teste, confirma que nenhuma alcança os
dados da outra, que a carta fica lacrada e depois abre, e que apagar a conta
remove tudo — e apaga as contas ao final, inclusive se falhar.

## Configuração externa

No painel do Supabase, em **Authentication → URL Configuration**, as URLs de
retorno precisam incluir o domínio de produção e `http://localhost:3000/**`,
ou o link de entrada por e-mail não volta para a aplicação.

O remetente padrão do Supabase tem limite baixo e cai em spam; para uso real,
configure um SMTP próprio.

## Créditos

Fotografias do Unsplash, sob a Licença Unsplash, creditadas em `/creditos`.

## Licença

MIT, para o código. O conteúdo espiritual em `src/content/` é de autoria
própria e sujeito a revisão eclesiástica antes de qualquer uso público.
