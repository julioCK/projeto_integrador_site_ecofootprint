// Elementos DOM
const navButtons = document.querySelectorAll('.nav-button');
const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const form = document.getElementById('questionnaire-form');
const resultsSection = document.getElementById('results');
const totalScoreEl = document.getElementById('total-score');
const planetsNeededEl = document.getElementById('planets-needed');
const classificationEl = document.getElementById('classification');
const recommendationsEl = document.getElementById('recommendations');
const resultsBackBtn = document.getElementById('results-back');
const historyList = document.getElementById('history-list');
const historyStatus = document.getElementById('history-status');
const historyClearBtn = document.getElementById('history-clear');
const toastContainer = document.getElementById('toast-container');
const submitLoader = document.getElementById('submit-loader');
const savePdfBtn = document.getElementById('save-pdf');

let currentScreenId = 'home';

// Mostrar notificação toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = message;
    
    toastContainer.appendChild(toast);
    
    // Remover toast após 5 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 5000);
}

// Classificação de pontuação e recomendações
function classifyScore(score) {
    if (score <= 7) {
        return {
            classification: "Baixa",
            recommendations: "Parabéns! Seus hábitos são sustentáveis. Continue assim e inspire outras pessoas."
        };
    } else if (score <= 14) {
        return {
            classification: "Moderada",
            recommendations: "Você está no caminho! Considere reduzir ainda mais o consumo de carne e energia elétrica."
        };
    } else {
        return {
            classification: "Alta",
            recommendations: "Atenção! Considere usar transporte público, reduzir carne e adotar práticas de economia de energia e água."
        };
    }
}

// Função de navegação
function showScreen(screenId) {
    // Atualizar a tela atual
    screens.forEach(screen => {
        const isActive = screen.id === screenId;
        screen.classList.toggle('active', isActive);
        
        if (isActive) {
            screen.removeAttribute('hidden');
            // Focar no heading da seção para leitores de tela
            const heading = screen.querySelector('h1, h2');
            if (heading) {
                heading.setAttribute('tabindex', '-1');
                heading.focus();
            }
        } else {
            screen.setAttribute('hidden', 'true');
        }
    });
    
    currentScreenId = screenId;
    updateNavCurrent(screenId);
    
    // Rolar para o topo
    window.scrollTo(0, 0);
}

function updateNavCurrent(screenId) {
    navButtons.forEach(btn => {
        btn.setAttribute('aria-current', btn.id === 'nav-' + screenId ? 'page' : 'false');
    });
}

// Manipulador de envio de formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Mostrar indicador de carregamento
    const btnText = form.querySelector('.btn-text');
    btnText.style.display = 'none';
    submitLoader.style.display = 'block';
    form.querySelector('button[type="submit"]').disabled = true;
    
    // Simular processamento (em uma aplicação real, isso seria assíncrono)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Calcular soma da pontuação
    let totalScore = 0;
    
    // Transporte
    totalScore += parseInt(document.querySelector('input[name="carro"]:checked').value);
    totalScore += parseInt(document.querySelector('input[name="transporte_publico"]:checked').value);
    totalScore += parseInt(document.querySelector('input[name="bicicleta"]:checked').value);
    
    // Energia
    totalScore += parseInt(document.querySelector('input[name="consumo_energia"]:checked').value);
    totalScore += parseInt(document.querySelector('input[name="energia_alternativa"]:checked').value);
    totalScore += parseInt(document.querySelector('input[name="lampadas_led"]:checked').value);
    totalScore += parseInt(document.querySelector('input[name="desliga_aparelhos"]:checked').value);
    
    // Alimentação
    totalScore += parseInt(document.querySelector('input[name="carne_vermelha"]:checked').value);
    totalScore += parseInt(document.querySelector('input[name="industrializados"]:checked').value);
    totalScore += parseInt(document.querySelector('input[name="produtores_locais"]:checked').value);
    
    // Água
    totalScore += parseInt(document.querySelector('input[name="economia_agua"]:checked').value);
    totalScore += parseInt(document.querySelector('input[name="agua_chuva"]:checked').value);

    const planetsNeeded = 1 + totalScore / 10;
    const { classification, recommendations } = classifyScore(totalScore);

    // Salvar resultados no localStorage com timestamp
    const resultEntry = {
        date: new Date().toISOString(),
        totalScore,
        planetsNeeded: planetsNeeded.toFixed(1),
        classification,
        recommendations
    };

    let history = JSON.parse(localStorage.getItem('ecoFootprintHistory')) || [];
    history.unshift(resultEntry);
    localStorage.setItem('ecoFootprintHistory', JSON.stringify(history));
    
    // Preencher histórico
    populateHistory();
    
    // Mostrar resultados
    totalScoreEl.textContent = totalScore;
    planetsNeededEl.textContent = planetsNeeded.toFixed(1);
    classificationEl.textContent = classification;
    recommendationsEl.textContent = recommendations;
    
    // Mostrar notificação de sucesso
    showToast('✅ Cálculo concluído com sucesso!', 'success');
    
    // Navegar para a tela de resultados
    showScreen('results');
    
    // Restaurar botão
    btnText.style.display = 'block';
    submitLoader.style.display = 'none';
    form.querySelector('button[type="submit"]').disabled = false;
});

// Preencher lista de histórico
function populateHistory() {
    let history = JSON.parse(localStorage.getItem('ecoFootprintHistory')) || [];
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyStatus.textContent = 'Nenhum resultado armazenado. Complete o questionário para ver seu histórico aqui.';
        historyClearBtn.disabled = true;
        return;
    }
    
    historyStatus.textContent = `Seu histórico (${history.length} resultado${history.length !== 1 ? 's' : ''}):`;
    historyClearBtn.disabled = false;
    
    history.forEach(entry => {
        const date = new Date(entry.date);
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${date.toLocaleDateString('pt-BR')}</strong> às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            <br>Pontuação: <strong>${entry.totalScore}</strong>
            | Planetas: <strong>${entry.planetsNeeded}</strong>
            | Classificação: <strong>${entry.classification}</strong>
        `;
        historyList.appendChild(li);
    });
}

// Botão limpar histórico
historyClearBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('ecoFootprintHistory');
        populateHistory();
        showToast('Histórico limpo com sucesso.', 'info');
    }
});

// click dos botões de navegação
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetScreen = btn.id.replace('nav-', '');
        showScreen(targetScreen);
    });
});

// Botão iniciar
startBtn.addEventListener('click', () => {
    showScreen('questionnaire');
});

// Botão voltar aos resultados
resultsBackBtn.addEventListener('click', () => {
    showScreen('home');
});

// Botão salvar PDF (ainda nao implementado)
savePdfBtn.addEventListener('click', () => {
    showToast('Funcionalidade de exportação em desenvolvimento.', 'info');
}); 

// Ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    populateHistory();
    showScreen('home');
    
    // Adicionar suporte a navegação por teclado
    document.addEventListener('keydown', (e) => {
        // Tecla ESC fecha modais ou retorna à tela inicial
        if (e.key === 'Escape' && currentScreenId !== 'home') {
            showScreen('home');
        }
    });
    
    // Verificar se há suporte a localStorage
    if (typeof(Storage) === "undefined") {
        showToast("Seu navegador não suporta armazenamento local. O histórico não será salvo.", "error");
    }
});

// foco para acessibilidade
document.addEventListener('focusin', () => {
    document.body.classList.add('keyboard-nav');
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});