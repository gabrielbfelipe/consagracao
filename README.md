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

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Supabase (Postgres com RLS)
· Motion · Vercel.

### Entrada sem verificação de e-mail — provisório

A conta nasce em `/cadastro`, com o endereço já dado por confirmado, para que
ninguém espere mensagem nenhuma. **Isso é temporário.**

Sem verificação, nada impede alguém de se cadastrar com um e-mail que não é
seu; quem controla a conta é quem escolheu a senha. Antes de abrir ao público,
volte a exigir confirmação — basta trocar `src/app/cadastro/acoes.ts` pelo
envio de link, que o resto do sistema não muda.

O que a falta de verificação torna crítico é que cadastrar-se com um e-mail já
usado **não** troque a senha de quem o tem: seria a tomada de conta alheia mais
barata possível. `npm run verificar:cadastro` prova que não acontece, junto com
o resto do fluxo.

### A sessão não sobrevive ao navegador

Entrar é um gesto feito a cada visita; não há "continuar conectado". São duas
travas, porque uma só não basta. Os cookies do Supabase perdem a validade e
viram cookies de sessão, que o navegador descarta ao fechar. E, porque
navegador configurado para restaurar a sessão devolveria esses cookies, o
`src/proxy.ts` carimba o início da sessão à parte e recusa qualquer uma com
mais de doze horas — trava de servidor, que nenhuma configuração do navegador
contorna. Tudo isto mora em `src/lib/supabase/sessao.ts`.

### Quem está dentro fica dentro

Uma vez autenticada, a pessoa só volta à vitrine clicando em "Sair". As salas
públicas trocam de pórtico sozinhas (`PorticoDaSala`), e o proxy devolve `/`,
`/entrar` e `/cadastro` para `/caminho` enquanto houver sessão.

### Trocar a data não custa nada

A data da consagração pode ser trocada a qualquer momento, em qualquer fase —
inclusive no próprio Grande Dia, porque quem precisa adiar costuma precisar no
pior momento. A troca **altera a jornada que existe** em vez de abrir outra, e
é por isso que o diário, a carta do primeiro dia, o motivo e os dias já acesos
atravessam intactos: tudo isso pende da jornada, e uma jornada nova deixaria o
histórico órfão e invisível. `npm run verificar:troca` prova exatamente isso —
compara o identificador da jornada antes e depois, e não só as datas.

### Modo de ensaio

`NEXT_PUBLIC_MODO_ENSAIO=1` põe no calendário uma data cuja preparação começa
sempre hoje, e uma régua no pé da tela que anda pelos 33 dias sem esperar 33
dias — movendo as datas da jornada, nunca o relógio. Sem a variável, a data
some do calendário e o servidor recusa-a mesmo para quem souber o endereço;
as 24 datas marianas continuam a ser a regra. Na Vercel está ligada apenas
para prévias. `npm run verificar:ensaio` percorre a jornada inteira, incluindo
a carta que só se abre no Grande Dia.

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
| `npm run verificar:entrada` | Prova que a criação de conta não toma conta alheia |
| `npm run publicar` | Publica na Vercel |

O `verificar:rls` cria duas contas de teste, confirma que nenhuma alcança os
dados da outra, que a carta fica lacrada e depois abre, e que apagar a conta
remove tudo — e apaga as contas ao final, inclusive se falhar.

## Configuração externa

Enquanto a entrada for por senha, nada precisa ser configurado no painel do
Supabase — a conta é criada pelo servidor com a chave secreta.

Quando a confirmação de e-mail voltar, serão necessários dois ajustes: as URLs
de retorno em **Authentication → URL Configuration**, incluindo o domínio de
produção e `http://localhost:3000/**`; e um SMTP próprio, porque o remetente
padrão do Supabase tem limite baixo e cai em spam.

## Créditos

Fotografias do Unsplash, sob a Licença Unsplash, creditadas em `/creditos`.

## Licença

MIT, para o código. O conteúdo espiritual em `src/content/` é de autoria
própria e sujeito a revisão eclesiástica antes de qualquer uso público.
