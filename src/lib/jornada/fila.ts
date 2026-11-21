/**
 * Uma fila que faz as tarefas uma de cada vez, na ordem em que chegaram.
 *
 * Existe por causa de um defeito real: o condutor do dia mandava gravar cada
 * passo sem esperar o anterior terminar. Duas gravações ao mesmo tempo liam
 * a mesma lista antiga, cada uma acrescentava o seu passo, e a última a
 * gravar apagava o passo da outra. O dia ficava com seis de sete passos e
 * nunca contava como concluído.
 *
 * Uma tarefa que falha não trava as seguintes: o erro volta a quem a pediu,
 * e a fila continua.
 */
export function criarFila() {
  let cauda: Promise<unknown> = Promise.resolve();

  return function enfileirar<T>(tarefa: () => Promise<T>): Promise<T> {
    const resultado = cauda.then(tarefa, tarefa);
    cauda = resultado.catch(() => undefined);
    return resultado;
  };
}
