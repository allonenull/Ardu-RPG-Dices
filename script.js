function getResult(dice, attribute) {
  if (isNaN(dice) || isNaN(attribute)) {
    return '...';
  }

  const total = attribute;
  const metade = attribute / 2;
  const quinto = attribute / 5;

  if (dice === 100) {
    return `DESASTRE`;
  } else if (dice > total || total === 0) {
    return `FALHA`;
  } else if (dice === 1) {
    return `CRÍTICO`;
  } else if (dice > metade && dice <= total) {
    return `NORMAL`;
  } else if (dice > quinto && dice <= metade) {
    return `BOM`;
  } else if (dice <= quinto && dice > 1) {
    return `EXTREMO`;
  }
}
let attributeResult = '...';
let proficiencyResult = '...';

function startInputs(valueFieldId, diceFieldId, resultFieldId, onRefresh) {
  const resultElement = document.querySelector(`#${resultFieldId}`);
  const valueInput = document.querySelector(`#${valueFieldId}`);
  const diceInput = document.querySelector(`#${diceFieldId}`);

  function refreshResultElement() {
    const diceValue = parseInt(diceInput.value);
    const attributeValue = parseInt(valueInput.value);

    const result = getResult(diceValue, attributeValue);

    resultElement.innerHTML = result;
    onRefresh(result);
  }

  valueInput.addEventListener('input', refreshResultElement);
  diceInput.addEventListener('input', refreshResultElement);
}

const finalResultElement = document.querySelector(`#final-result`);

startInputs('proficiency-1', 'dice-1', 'result-1', (value) => {
  proficiencyResult = value;
  finalResultElement.innerHTML = getFinalResult();
});
startInputs('attribute-1', 'dice-2', 'result-2', (value) => {
  attributeResult = value;
  finalResultElement.innerHTML = getFinalResult();
});

/*
Desastre + Desastre = Super Desastre
Desastre + Falha = Desastre
Desastre + Normal/Bom/Extremo = Falha
Desastre + Crítico = Normal

Normal + Desastre = Desastre
Normal + Falha = Normal
Normal + Normal/Bom/Extremo = Bom
Normal + Crítico = Crítico

Bom + Desastre = Desastre
Bom + Falha/Normal = Bom
Bom + Bom/Extremo = Extremo
Bom + Crítico = Crítico

Extremo + Desastre = Desastre
Extremo + Falha/Normal/Bom = Extremo
Extremo + Extremo = Crítico
Extremo + Crítico = Crítico

Crítico + Desastre = Normal
Crítico + Falha/Normal/Bom/Extremo = Crítico
Crítico + Crítico = Super Crítico

Falha + Falha = Falha

DESASTRE > FALHA > NORMAL > BOM > EXTREMO > CRÍTICO
*/
function getFinalResult() {
  /** Attribute > Proficiency */
  const results = {
    CRÍTICO: {
      CRÍTICO: 'SUPER CRÍTICO',
      EXTREMO: 'CRÍTICO',
      BOM: 'CRÍTICO',
      NORMAL: 'CRÍTICO',
      FALHA: 'CRÍTICO',
      DESASTRE: 'NORMAL',
    },
    EXTREMO: {
      CRÍTICO: 'CRÍTICO',
      EXTREMO: 'CRÍTICO',
      BOM: 'EXTREMO',
      NORMAL: 'EXTREMO',
      FALHA: 'EXTREMO',
      DESASTRE: 'DESASTRE',
    },
    BOM: {
      CRÍTICO: 'CRÍTICO',
      EXTREMO: 'EXTREMO',
      BOM: 'EXTREMO',
      NORMAL: 'BOM',
      FALHA: 'BOM',
      DESASTRE: 'DESASTRE',
    },
    NORMAL: {
      CRÍTICO: 'CRÍTICO',
      EXTREMO: 'BOM',
      BOM: 'BOM',
      NORMAL: 'BOM',
      FALHA: 'NORMAL',
      DESASTRE: 'DESASTRE',
    },
    FALHA: {
      CRÍTICO: 'CRÍTICO',
      EXTREMO: 'NORMAL',
      BOM: 'NORMAL',
      NORMAL: 'NORMAL',
      FALHA: 'DESASTRE',
      DESASTRE: 'DESASTRE',
    },
    DESASTRE: {
      CRÍTICO: 'NORMAL',
      EXTREMO: 'FALHA',
      BOM: 'FALHA',
      NORMAL: 'FALHA',
      FALHA: 'DESASTRE',
      DESASTRE: 'SUPER DESASTRE',
    },
  };

  const result = results[proficiencyResult]?.[attributeResult];
  return result || '...';
}
