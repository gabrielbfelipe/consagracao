/**
 * O guia do dia da consagração.
 * CONTEÚDO SUJEITO A REVISÃO PASTORAL.
 */

export type Momento = {
  id: string;
  titulo: string;
  /** Quando acontece, em linguagem de quem está vivendo o dia. */
  quando: string;
  paragrafos: string[];
};

export const MOMENTOS: readonly Momento[] = [
  {
    id: "antes",
    titulo: "Na véspera, ou hoje cedo",
    quando: "Antes de tudo",
    paragrafos: [
      "A tradição recomenda confessar-se antes da consagração. Não porque seja obrigatório para que ela valha, mas porque faz sentido: entrega-se melhor o que está limpo. Se você não conseguiu marcar a confissão, isso não invalida nada — faça-a assim que puder.",
      "Procure participar da missa hoje e comungar. A consagração é feita a Jesus Cristo, e a comunhão é o momento em que Ele se dá de fato. Se for possível, faça a consagração logo depois da comunhão, ainda de joelhos.",
    ],
  },
  {
    id: "onde",
    titulo: "Onde e a que horas",
    quando: "Escolhido por você",
    paragrafos: [
      "Diante de uma imagem de Nossa Senhora, se houver uma igreja aberta perto de você. Em casa também serve, diante de uma imagem, de um terço ou simplesmente em um canto silencioso.",
      "Escolha uma hora em que ninguém vá interromper. Quinze minutos bastam. Deixe o celular em outro cômodo, ou ao menos silencioso e fora da mão.",
    ],
  },
  {
    id: "ordem",
    titulo: "A ordem das orações",
    quando: "No momento da consagração",
    paragrafos: [
      "Comece invocando o Espírito Santo com o Vinde, Espírito Criador. Reze em seguida a Ave, Estrela do Mar e o Magnificat.",
      "Então leia a fórmula da consagração, devagar, em voz alta se estiver sozinho. Não é preciso decorar nem sentir emoção nenhuma: o que vale é a vontade com que se diz.",
      "Termine com o Ó Jesus vivente em Maria, e fique alguns minutos em silêncio antes de sair.",
    ],
  },
  {
    id: "depois",
    titulo: "Depois de rezar",
    quando: "Ainda hoje",
    paragrafos: [
      "Muitos costumam registrar a data em algum lugar que vão reencontrar: na primeira página do livro, num caderno, numa imagem. Aqui você pode gerar o seu memorial.",
      "Alguns acrescentam um sinal exterior, como passar a usar a Medalha Milagrosa ou o escapulário. É costume antigo e bom, mas não é exigência — a consagração já está feita.",
      "Não espere sentir nada de especial. Grande parte das pessoas não sente. O que mudou não foi o sentimento: foi a intenção com que você vai viver daqui em diante.",
    ],
  },
] as const;
