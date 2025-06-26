function preencherSelectsEdicao(callback) {
  let passageiros = [];
  let destinos = [];

  // Preencher passageiros
  fetch("http://localhost:8080/usuarios")
    .then(res => res.json())
    .then(data => {
      passageiros = data;
      const combo = document.querySelector(".editPassageiro");
      if (combo) {
        combo.innerHTML = '<option value="">Selecione um passageiro</option>';
        passageiros.forEach(p => {
          const option = document.createElement("option");
          option.value = p.id;
          option.textContent = `${p.id} - ${p.nome}`;
          combo.appendChild(option);
        });
      }
      checkIfDone();
    });

  // Preencher destinos
  fetch("http://localhost:8080/destinos")
    .then(res => res.json())
    .then(data => {
      destinos = data;
      const combo = document.querySelector(".editDestino");
      if (combo) {
        combo.innerHTML = '<option value="">Selecione um destino</option>';
        destinos.forEach(d => {
          const option = document.createElement("option");
          option.value = d.id;
          option.textContent = `${d.id} - ${d.pais}, ${d.cidade}`;
          combo.appendChild(option);
        });
      }
      checkIfDone();
    });

  // Verifica se os dois fetchs terminaram
  let done = 0;
  function checkIfDone() {
    done++;
    if (done === 2 && typeof callback === "function") {
      callback();
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // PASSAGEIRO
  const formPassageiro = document.getElementById("formPassageiro");
  if (formPassageiro) {
    formPassageiro.addEventListener("submit", function (event) {
      event.preventDefault();
      const nome = document.querySelector(".nome").value;
      const email = document.querySelector(".email").value;
      const senha = document.querySelector(".senha").value;
      const telefone = document.querySelector(".telefone").value;

      fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, telefone })
      }).then(res => console.log(res));
    });
  }

  // DESTINO
  const formDestino = document.getElementById("formDestino");
  if (formDestino) {
    formDestino.addEventListener("submit", function (event) {
      event.preventDefault();
      const cidade = document.querySelector(".cidade").value;
      const pais = document.querySelector(".pais").value;

      fetch("http://localhost:8080/destinos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cidade, pais })
      }).then(res => console.log(res));
    });

    // Lógica de cidades por país
    const paisSelect = document.querySelector(".pais");
    const cidadeSelect = document.querySelector(".cidade");

    const estadosBrasil = [
      "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará",
      "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão",
      "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará",
      "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro",
      "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
      "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
    ];

    const cidadesGenericas = {
      "Argentina": ["Buenos Aires", "Córdoba", "Rosário"],
      "Estados Unidos": ["Nova York", "Los Angeles", "Chicago"],
      "Portugal": ["Lisboa", "Porto", "Coimbra"],
      "Japão": ["Tóquio", "Osaka", "Kyoto"],
      "França": ["Paris", "Lyon", "Marselha"],
      "Alemanha": ["Berlim", "Munique", "Hamburgo"],
      "Reino Unido": ["Londres", "Manchester", "Liverpool"],
      "Canadá": ["Toronto", "Vancouver", "Montreal"],
      "Itália": ["Roma", "Milão", "Florença"]
    };

    paisSelect.addEventListener("change", function () {
      const pais = this.value;
      cidadeSelect.innerHTML = '<option value="">Selecione a cidade/estado</option>';

      let cidades = [];

      if (pais === "Brasil") {
        cidades = estadosBrasil;
      } else if (cidadesGenericas[pais]) {
        cidades = cidadesGenericas[pais];
      }

      cidades.forEach(cidade => {
        const option = document.createElement("option");
        option.value = cidade;
        option.textContent = cidade;
        cidadeSelect.appendChild(option);
      });
    });
  }

  // VIAGEM
  const formViagem = document.getElementById("formViagem");
  if (formViagem) {
    formViagem.addEventListener("submit", function (event) {
      event.preventDefault();
      const passageiroId = document.querySelector(".idPassageiro").value;
      const destinoId = document.querySelector(".idDestino").value;

      fetch("http://localhost:8080/viagens", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ passageiroId, destinoId })
      }).then(res => {
        if (res.ok) {
          alert("Viagem reservada com sucesso!");
          formViagem.reset();
        } else {
          alert("Erro ao reservar a viagem.");
        }
      });
    });
  }
});


// === POPULAR TABELAS E COMBOS SE EXISTIREM ===
fetch("http://localhost:8080/usuarios")
  .then(res => res.json())
  .then(data => {
    const tabela = document.querySelector("#tabelaPassageiros tbody");
    const combo = document.querySelector(".idPassageiro");
    if (tabela && combo) {
      data.forEach(p => {
        // tabela
        const row = document.createElement("tr");
        row.innerHTML = `<td>${p.id}</td><td>${p.nome}</td><td>${p.email}</td><td>${p.telefone}</td>`;
        tabela.appendChild(row);

        // combo
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = `${p.id} - ${p.nome}`;
        combo.appendChild(option);
      });
    }
  });

fetch("http://localhost:8080/destinos")
  .then(res => res.json())
  .then(data => {
    const tabela = document.querySelector("#tabelaDestinos tbody");
    const combo = document.querySelector(".idDestino");
    if (tabela && combo) {
      data.forEach(d => {
        // tabela
        const row = document.createElement("tr");
        row.innerHTML = `<td>${d.id}</td><td>${d.pais}</td><td>${d.cidade}</td>`;
        tabela.appendChild(row);

        // combo
        const option = document.createElement("option");
        option.value = d.id;
        option.textContent = `${d.id} - ${d.pais}, ${d.cidade}`;
        combo.appendChild(option);
      });
    }
  });

fetch("http://localhost:8080/viagens")
  .then(res => res.json())
  .then(data => {
    const tabela = document.querySelector("#tabelaReservas tbody");
    if (tabela) {
      tabela.innerHTML = ""; // limpa a tabela antes

      data.forEach(v => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${v.id}</td>
          <td>
            <div><strong>${v.passageiro.nome}</strong></div>
            <div style="font-size: 0.85em; color: #555;">${v.passageiro.email}</div>
          </td>
          <td>${v.destino.pais} - ${v.destino.cidade}</td>
          <td>
            <button class="btn-editar" data-id="${v.id}">✏️</button>
            <button class="btn-excluir" data-id="${v.id}">🗑️</button>
          </td>
        `;

        tabela.appendChild(row);
      });

      // === EVENTO: EXCLUIR RESERVA ===
      document.querySelectorAll(".btn-excluir").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          if (confirm(`Deseja excluir a reserva #${id}?`)) {
            fetch(`http://localhost:8080/viagens/${id}`, {
              method: "DELETE"
            }).then(res => {
              if (res.ok) {
                alert("Reserva excluída com sucesso!");
                location.reload();
              } else {
                alert("Erro ao excluir a reserva.");
              }
            });
          }
        });
      });

      // === EVENTO: EDITAR RESERVA ===
      document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const section = document.getElementById("editarReservaSection");
          const inputId = document.querySelector(".editId");

          inputId.value = id;
          section.style.display = "block";
          window.scrollTo({ top: section.offsetTop, behavior: "smooth" });

          fetch(`http://localhost:8080/viagens/${id}`)
            .then(res => res.json())
            .then(viagem => {
              preencherSelectsEdicao(() => {
                const passageiroSelect = document.querySelector(".editPassageiro");
                const destinoSelect = document.querySelector(".editDestino");

                if (passageiroSelect && destinoSelect) {
                  passageiroSelect.value = viagem.passageiro.id;
                  destinoSelect.value = viagem.destino.id;
                }
              });
            });
        });
      });
    }
  });

// === FUNÇÃO PARA PREENCHER OS SELECTS COM CALLBACK ===
function preencherSelectsEdicao(callback) {
  let done = 0;

  fetch("http://localhost:8080/usuarios")
    .then(res => res.json())
    .then(data => {
      const passageiroSelect = document.querySelector(".editPassageiro");
      if (passageiroSelect) {
        passageiroSelect.innerHTML = '<option value="">Selecione um passageiro</option>';
        data.forEach(p => {
          const option = document.createElement("option");
          option.value = p.id;
          option.textContent = `${p.id} - ${p.nome}`;
          passageiroSelect.appendChild(option);
        });
      }
      done++;
      if (done === 2 && typeof callback === "function") callback();
    });

  fetch("http://localhost:8080/destinos")
    .then(res => res.json())
    .then(data => {
      const destinoSelect = document.querySelector(".editDestino");
      if (destinoSelect) {
        destinoSelect.innerHTML = '<option value="">Selecione um destino</option>';
        data.forEach(d => {
          const option = document.createElement("option");
          option.value = d.id;
          option.textContent = `${d.id} - ${d.pais}, ${d.cidade}`;
          destinoSelect.appendChild(option);
        });
      }
      done++;
      if (done === 2 && typeof callback === "function") callback();
    });
}


// === EVENTO: ENVIAR FORMULÁRIO DE EDIÇÃO ===
const formEditar = document.getElementById("formEditarReserva");

if (formEditar) {
  formEditar.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.querySelector(".editId").value;
    const passageiroId = document.querySelector(".editPassageiro").value;
    const destinoSelect = document.querySelector(".editDestino");
    const destinoId = destinoSelect.value;

    // Aqui você monta o JSON e faz a requisição PUT
    const dados = {
      passageiroId: parseInt(passageiroId),
      destinoId: parseInt(destinoId)
    };

    fetch(`http://localhost:8080/viagens/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
      .then(response => {
        if (response.ok) {
          // Oculta o formulário após sucesso
          formEditar.style.display = "none";

          // Se quiser, pode exibir um alerta ou mensagem
          alert("Reserva atualizada com sucesso!");
        } else {
          alert("Erro ao atualizar reserva.");
        }
      })
      .catch(error => {
        console.error("Erro na requisição:", error);
        alert("Erro ao atualizar reserva.");
      });
  });
}
