import Link from "next/link";
import { PAGINAS } from "@/content/sobre";

/** O rodapé da casa: as portas todas, e o que precisa estar dito. */
export function Rodape() {
  return (
    <footer className="border-t border-[color-mix(in_oklab,var(--color-bronze)_38%,transparent)] bg-[var(--color-sombra)] px-6 pt-20 pb-12 sm:px-10">
      <div className="mx-auto max-w-[110rem]">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-[family-name:var(--font-livro)] text-2xl tracking-[0.2em] text-[var(--color-marfim)] uppercase">
              Consagração
            </p>
            <p className="voz-livro mt-6 max-w-[42ch] text-[0.98rem] text-[var(--texto-suave)]">
              Um caminho de preparação, oração e conhecimento que conduz o
              coração a Cristo pelas mãos de Maria, segundo São Luís Maria
              Grignion de Montfort.
            </p>
          </div>

          <nav aria-label="Sobre">
            <h2 className="font-[family-name:var(--font-livro)] text-sm tracking-[0.22em] text-[var(--color-ouro)] uppercase">
              A preparação
            </h2>
            <ul className="mt-6 space-y-3">
              {PAGINAS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/sobre/${p.slug}`} className={ELO}>
                    {p.menu}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="O santuário">
            <h2 className="font-[family-name:var(--font-livro)] text-sm tracking-[0.22em] text-[var(--color-ouro)] uppercase">
              O santuário
            </h2>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/calendario" className={ELO}>
                  Calendário mariano
                </Link>
              </li>
              <li>
                <Link href="/biblioteca" className={ELO}>
                  Biblioteca de orações
                </Link>
              </li>
              <li>
                <Link href="/oracao" className={ELO}>
                  Um momento de oração
                </Link>
              </li>
              <li>
                <Link href="/silencio" className={ELO}>
                  Modo silêncio
                </Link>
              </li>
              <li>
                <Link href="/cadastro" className={ELO}>
                  Criar conta
                </Link>
              </li>
              <li>
                <Link href="/entrar" className={ELO}>
                  Entrar
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-[color-mix(in_oklab,var(--color-bronze)_30%,transparent)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[58ch] text-sm leading-relaxed text-[color-mix(in_oklab,var(--color-pergaminho)_42%,transparent)]">
            Esta preparação acompanha o Tratado da Verdadeira Devoção, que não é
            reproduzido aqui por respeito a quem o traduziu e publicou.
          </p>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href="/privacidade" className={ELO}>
              Privacidade
            </Link>
            <Link href="/creditos" className={ELO}>
              Créditos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const ELO = `font-[family-name:var(--font-interface)] text-sm
  text-[color-mix(in_oklab,var(--color-pergaminho)_62%,transparent)]
  transition-colors duration-500 hover:text-[var(--color-ouro-luz)]`;
