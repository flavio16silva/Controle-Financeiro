// shift + alt + seta para baixo: duplicar a linha

const transacaoUl = document.querySelector('#transacoes')

const realTransacao = [
  { id: 1, name: 'Bolo de Brigadeiro', quantia: -20 },
  { id: 2, name: 'Salário', quantia: 300 },
  { id: 3, name: 'Torta de Frango', quantia: -10 },
  { id: 4, name: 'Violão', quantia: 150 }
]

const addTransacoesNoDom = transacao => {
  const operacao = transacao.quantia < 0 ? '-' : '+'
  const CSSClass = transacao.quantia < 0 ? 'menos' : 'plus'
  const valorSemOperacao = Math.abs(transacao.quantia)
  const li = document.createElement('li') //Criando um novo elemento HTML

  li.classList.add(CSSClass)
  li.innerHTML = `
    ${transacao.name} <span>${operacao} R$ ${valorSemOperacao}</span><button class="delete-btn">x</button>
  `
 //transacaoUl.innerHTML = li ===> [object HTMLLIElement]
    transacaoUl.prepend(li)
 // console.log(li)
}

const atualizaValorSaldo = () => {
  const transacaoQuantia = realTransacao.map(transacao => transacao.quantia)
  console.log(transacaoQuantia)
}



// Função que executa o preenchimento das informações do estado da aplicação, quando a pagina for carregada. Add as transações no DOM. 
const inicio = () => {
  realTransacao.forEach(addTransacoesNoDom)
  atualizaValorSaldo()
}

inicio()

// addTransacoesNoDom(realTransacao[2])
// addTransacoesNoDom(realTransacao[1])
