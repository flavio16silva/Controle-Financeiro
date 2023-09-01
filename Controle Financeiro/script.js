// shift + alt + seta para baixo: duplicar a linha

const transacaoUl = document.querySelector('#transacoes')
const exibindoReceita = document.querySelector('#dinheiro-plus')
const exibindoDespesa = document.querySelector('#dinheiro-menos')  //Inserindo informações no DOM
const exibindoTotal = document.querySelector('#balanco')

const form = document.querySelector('#form')
const nomeTransacaoEntrada = document.querySelector('#text')
const valorTransacaoEntrada = document.querySelector('#quantia')


// console.log(form)
//console.log({ exibindoReceita, exibindoDespesa, exibindoTotal  }) Testando como objeto

let realTransacao = [
  { id: 1, name: 'Bolo de Brigadeiro', quantia: -20 },
  { id: 2, name: 'Salário', quantia: 300 },
  { id: 3, name: 'Torta de Frango', quantia: -10 },
  { id: 4, name: 'Violão', quantia: 150 }
]

//Remoção de Transações
const removeTransacao = ID => {
  realTransacao = realTransacao.filter(transacao => transacao.id !== ID)
  console.log(realTransacao)
}

const addTransacoesNoDom = transacao => {
  const operacao = transacao.quantia < 0 ? '-' : '+'
  const CSSClass = transacao.quantia < 0 ? 'menos' : 'plus'
  const valorSemOperacao = Math.abs(transacao.quantia)
  const li = document.createElement('li') //Criando um novo elemento HTML

  li.classList.add(CSSClass)
  li.innerHTML = `
    ${transacao.name} 
    <span>${operacao} R$ ${valorSemOperacao}</span>
    <button class="delete-btn" on-Click="removerTransacao(${transacao.id})">
    x
    </button>
  `
 //transacaoUl.innerHTML = li ===> [object HTMLLIElement]
    transacaoUl.prepend(li)
 
}

const atualizaValorSaldo = () => {
  const transacaoQuantia = realTransacao
    .map(transacao => transacao.quantia)
  const total = transacaoQuantia
    .reduce((accumulator, transacao) => accumulator + transacao, 0)
    .toFixed(2)
  const receita = transacaoQuantia
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
  const despesas = Math.abs(transacaoQuantia
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2) 
    
    //Exibir saldo, receita e despesa total na tela
    exibindoTotal.textContent = `R$ ${total}`
    exibindoReceita.textContent = `R$ ${receita}`
    exibindoDespesa.textContent = `R$ ${despesas}`

  //console.log(despesas)
}





// Função que executa o preenchimento das informações do estado da aplicação, quando a pagina for carregada. Add as transações no DOM. 
const inicio = () => {
  transacaoUl.innerHTML = ''
  realTransacao.forEach(addTransacoesNoDom)
  atualizaValorSaldo()
}

inicio()


//Gerando os ids automaticamente de forma aleatoria
const geradorID = () => Math.round(Math.random() * 1000)

//Escutando os eventos
form.addEventListener('submit', event => {
  event.preventDefault()

  const transacaoNome = nomeTransacaoEntrada.value.trim()
  const transacaoQuantia = valorTransacaoEntrada.value.trim()

  //Caso um dos inputs não estejam preenchidos será exibido uma mensagem
  if (transacaoNome === '' || transacaoQuantia === '') {
    alert('Por favor, preencha tanto o nome quanto o valor da transação')
    return
  }

  const transacao = { 
    id: geradorID(), 
    name: transacaoNome, 
    quantia: Number(transacaoQuantia) 
  }
  //console.log(transacao)

  realTransacao.push(transacao)
  inicio()

  //Limpando os inputs do nome e valor da transação
  nomeTransacaoEntrada.value = ''
  valorTransacaoEntrada.value = ''
})



// addTransacoesNoDom(realTransacao[2])
// addTransacoesNoDom(realTransacao[1])













//ClaudiaAmora1820