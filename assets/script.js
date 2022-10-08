const tokenAccess = "live_91fc984fe7a9fd70158bad54366d47";
const idBrasileirao = 10;
const urlApi =  `https://api.api-futebol.com.br/v1/campeonatos/${idBrasileirao}/tabela`;
const statusOk = 200;

async function getTable() {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAccess}`,
          };

       var response = await fetch(urlApi, { headers });
       await handleResponse(response);
       
    } catch (error) {
        alert(error);
    }
}

async function handleResponse(response) {
    if (response.status == statusOk) {
        fillTable(await response.json());
    }
    else {
        alert("Erro no Servidor");     
    }
}

function fillTable(arrayTable) {
    for (let index = 0; index < arrayTable.length; index++) {
        addTeamToTable(arrayTable[index]);        
    }
}

function addTeamToTable(team) {
    const tableElement = document.getElementById('soccer-table');    
    const trElement = document.createElement('tr');
    tableElement.appendChild(trElement);
    trElement.appendChild(addValue(`${team.posicao} ${team.time.nome_popular}`));
    trElement.appendChild(addValue(team.pontos));
    trElement.appendChild(addValue(team.jogos));
    trElement.appendChild(addValue(team.vitorias));
    trElement.appendChild(addValue(team.empates));
    trElement.appendChild(addValue(team.derrotas));
    trElement.appendChild(addValue(team.gols_pro));
    trElement.appendChild(addValue(team.gols_contra));
    trElement.appendChild(addValue(team.saldo_gols));
    trElement.appendChild(addValue(team.aproveitamento));
    trElement.appendChild(addValue(handleLastMatches(team.ultimos_jogos)));
}

function addValue(value) {
    const tdElement = document.createElement('td'); 
    tdElement.innerHTML = value; 
   return tdElement;
}

function handleLastMatches(lastMatches) {
    return lastMatches.join();
}

getTable();