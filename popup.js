document.addEventListener('DOMContentLoaded', function () {

  let botaoPreencherCampos = document.getElementById('botaoPreencherCampos');
  let botaoApagarCampos = document.getElementById('botaoApagarCampos');
  let botaoLerCampoTipo = document.getElementById('botaoLerCampoTipo');
  let botaoPreencherCamposComValorTipo = document.getElementById('botaoPreencherCamposComValorTipo');
  // let inputTipo = document.getElementById('inputTipo');
  let botaoAdicionarTipo = document.getElementById('botaoAdicionarTipo')
  const inputTipoSelecionado = document.getElementById('selecionarTipo');


  botaoPreencherCampos.addEventListener('click', function () {
    // Obtém o tabId da guia ativa
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;

      // Injeta o script na guia ativa
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: procurarPreencherCampos,
      });
    });
  });


  botaoApagarCampos.addEventListener('click', function () { // Adicione este bloco de código
    // Obtém o tabId da guia ativa
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;

      // Injeta o script na guia ativa para excluir os campos
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: deletarCamposPreenchidos,
      });
    });
  });


  botaoLerCampoTipo.addEventListener('click', function () { // Adicione este bloco de código
    // Obtém o tabId da guia ativa
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;

      // Injeta o script na guia ativa para excluir os campos
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: lerCampoTipo,
      });
    });
  })


  botaoPreencherCamposComValorTipo.addEventListener('click', function () { // preenche os outros campos da tela com base no valor preenchido no campo do "Tipo"
    // Obtém o tabId da guia ativa
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;

      // Injeta o script na guia ativa para excluir os campos
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: preencherCamposComValorDoTipo,
      });
    });
  })


  botaoAdicionarTipo.addEventListener('click', function () { // 
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tabId = tabs[0].id;

      // Injeta o script na guia ativa para excluir os campos
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: preencherTipoComValorDoSelect,
        args: [inputTipoSelecionado.value]
      });
    });
  })



});




function procurarPreencherCampos() { // preencher os campos
  // selecionar os campos para interação de acordo com o ID
  const fieldsToFill = ['Local', 'SourceOfficeText', 'ResponsibleOfficeText', 'StatusText', 'AreaText'];

  fieldsToFill.forEach(function (fieldId) {
    const inputField = document.getElementById(fieldId);

    if (inputField) {
      // Preenche o campo com o texto desejado
      inputField.value = "Teste de preenchimento";
    }
  });
}

function deletarCamposPreenchidos() { // limpar os campos
  // selecionar os campos para interação de acordo com o ID
  const fieldsToFill = ['Local', 'SourceOfficeText', 'ResponsibleOfficeText', 'StatusText', 'AreaText', 'TipoText'];
  fieldsToFill.forEach(function (fieldId) {
    const inputField = document.getElementById(fieldId);

    if (inputField) {
      // Limpa o valor do campo
      inputField.value = "";
    }
  });
}

function lerCampoTipo() { // ler o campo "Tipo" de acordo com o ID
  const campoTipo = document.getElementById('TipoText');

  valorCampoTipo = campoTipo.value;

  // if (!valorCampoTipo == '') {
  //   console.log(valorCampoTipo)
  // };

  !valorCampoTipo == '' ? alert(`Tipo selecionado: ${valorCampoTipo}`) : alert('AVISO: Preencha o campo "Tipo"');
}

function preencherCamposComValorDoTipo() { // preencher outros campos com base no valor do campo "Tipo"

  const camposParaPreencher = ['ResponsibleOfficeText', 'SourceOfficeText', 'Descricao', 'StatusText', 'DeadlineCount', 'DeadlineCountText', 'Local', 'AreaText']

  const campoTipo = document.getElementById('TipoText').value;

  // if (campoTipo.value == 'Diversos') {
  // campoTipo.addEventListener('change', () => {
  //   preencherCamposComValorDoTipo(); // Chama a função quando o valor muda
  // });
  //   camposParaPreencher.forEach(function (fieldId) {
  // Evento de mudança no campo Tipo
  //     const inputField = document.getElementById(fieldId)

  //     if (inputField) {
  //       inputField.value = ' preenchendo campos com tipo Diversos '
  //     }
  //   })
  // }
  switch (campoTipo) {
    case 'Diversos':
      camposParaPreencher.forEach(function (fieldId) {
        const inputField = document.getElementById(fieldId);
        if (inputField) {
          inputField.value = 'Preenchendo campos com tipo Diversos';
        }
      });
      break;

    case 'Prazo':
      camposParaPreencher.forEach(function (fieldId) {
        const inputField = document.getElementById(fieldId);
        if (inputField) {
          inputField.value = 'Preenchendo campos com tipo Prazo';
        }
      });
      break;

    case 'Serviço':
      camposParaPreencher.forEach(function (fieldId) {
        const inputField = document.getElementById(fieldId);
        if (inputField) {
          inputField.value = 'Preenchendo campos com tipo Serviço';
        }
      });
      break;

    case 'Audiência':
      camposParaPreencher.forEach(function (fieldId) {
        const inputField = document.getElementById(fieldId);
        if (inputField) {
          inputField.value = 'Preenchendo campos com tipo Audiência';
        }
      });
      break;

    default:
      alert('Tipo não reconhecido');
  }
}

function preencherTipoComValorDoSelect(valorTipo) { // lê o valor digitado no input do tipo do popup para preencher o Tipo no Legal One
  // const tipoSelecionado = "teste"
  // const inputTipoSelecionado = document.getElementById('selecionarTipo');

  const campoTipo = document.getElementById('TipoText').value = valorTipo;
  console.log(campoTipo)

  // if (campoTipo) {
  //   // Defina o valor do campo na tela do site com o valor selecionado
  //   campoTipo.value = inputTipoSelecionado;
  //   console.log(inputTipoSelecionado)
  // } else {
  //   alert('O campo "TipoText" não foi encontrado na tela do site.');
  // }


}
