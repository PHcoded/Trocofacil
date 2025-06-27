let produtos = [];

function adicionarProduto() {
  const nome = document.getElementById("produto").value;
  const preco = parseFloat(document.getElementById("preco").value);

  if (!nome || isNaN(preco)) {
    alert("Preencha corretamente.");
    return;
  }

  produtos.push({ nome, preco, quantidade: 1 });
  document.getElementById("produto").value = "";
  document.getElementById("preco").value = "";
  renderizarTabela();
  calcularTotal();
}

function renderizarTabela() {
  const tabela = document.getElementById("lista-produtos");
  tabela.innerHTML = "";

  produtos.forEach((item, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${item.nome}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td><input type="number" min="1" value="${item.quantidade}" onchange="alterarQuantidade(${index}, this.value)" /></td>
      <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
      <td><button onclick="removerProduto(${index})">🗑️</button></td>
    `;

    tabela.appendChild(linha);
  });
}

function alterarQuantidade(index, novaQtd) {
  produtos[index].quantidade = parseInt(novaQtd);
  renderizarTabela();
  calcularTotal();
}

function removerProduto(index) {
  produtos.splice(index, 1);
  renderizarTabela();
  calcularTotal();
}

function calcularTotal() {
  const total = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);
  document.getElementById("total-compra").innerText = total.toFixed(2);
}

function calcularTroco() {
  const total = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);
  const pago = parseFloat(document.getElementById("valor-cliente").value);

  if (isNaN(pago)) {
    alert("Digite o valor pago pelo cliente.");
    return;
  }

  const troco = pago - total;
  document.getElementById("troco").innerText = troco >= 0 ? troco.toFixed(2) : "Valor insuficiente";
}

// Alternar tema
function alternarTema() {
  const body = document.body;
  const button = document.querySelector(".theme-toggle");

  body.classList.toggle("dark");
  button.textContent = body.classList.contains("dark") ? "☀️ Modo Claro" : "🌙 Modo Escuro";
}
