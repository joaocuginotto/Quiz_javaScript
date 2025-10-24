// ========================================
// DECLARAÇÃO DE VARIÁVEIS GLOBAIS
// ========================================

// var - Escopo de função ou global, pode ser redeclarada
// Exemplo antigo de declaração, menos usado hoje em dia
var nomeDoJogo = "Quiz JavaScript";

// let - Escopo de bloco, pode ter seu valor alterado
// Usamos let quando o valor vai mudar durante a execução
let questaoAtual = 0;
let pontuacao = 0;
let modoSelecionado = ""; // Armazena qual modo o usuário escolheu
let perguntasDoQuiz = []; // Array que vai conter as perguntas do quiz atual
let modoTemporario = ""; // Armazena temporariamente o modo clicado antes de escolher perguntas/resumo

// const - Escopo de bloco, NÃO pode ter seu valor reatribuído
// Usamos const quando o valor não vai mudar (constante)
const PONTOS_POR_ACERTO = 10;

// ========================================
// BANCO DE PERGUNTAS POR NÍVEL
// ========================================
// Cada modo agora tem 50 questões
// O quiz seleciona 10 aleatoriamente

// MODO INICIANTE - 50 questões sobre fundamentos básicos
const perguntasIniciante = [
    // Variáveis básicas (1-15)
    {pergunta: "Qual palavra-chave declara uma variável que pode mudar?", opcoes: ["const", "let", "final", "variable"], respostaCorreta: 1, explicacao: "'let' permite reatribuição de valores!"},
    {pergunta: "Qual palavra-chave declara uma constante?", opcoes: ["var", "let", "const", "constant"], respostaCorreta: 2, explicacao: "'const' cria valores constantes!"},
    {pergunta: "Qual é a forma antiga de declarar variáveis?", opcoes: ["let", "const", "var", "variable"], respostaCorreta: 2, explicacao: "'var' é antiga, use let/const!"},
    {pergunta: "O que acontece ao tentar mudar const?", opcoes: ["Muda normal", "Gera erro", "Ignora", "Vira null"], respostaCorreta: 1, explicacao: "const não pode ser reatribuído!"},
    {pergunta: "Qual usar por padrão em código moderno?", opcoes: ["var", "const", "let", "tanto faz"], respostaCorreta: 1, explicacao: "Use const por padrão!"},
    {pergunta: "Posso declarar let sem valor inicial?", opcoes: ["Não", "Sim, fica undefined", "Erro", "Fica null"], respostaCorreta: 1, explicacao: "let sem valor = undefined!"},
    {pergunta: "Qual está CORRETO?", opcoes: ["const PI = 3.14", "let 1nome = 'Ana'", "var meu-nome = 'Jo'", "const = 10"], respostaCorreta: 0, explicacao: "Variáveis não podem começar com número!"},
    {pergunta: "Posso redeclarar let no mesmo escopo?", opcoes: ["Sim", "Não, erro", "Recomendado", "Depende"], respostaCorreta: 1, explicacao: "Redeclarar let gera erro!"},
    {pergunta: "O que é undefined?", opcoes: ["Erro", "Declarada sem valor", "null", "Deletada"], respostaCorreta: 1, explicacao: "undefined = sem valor atribuído!"},
    {pergunta: "Como nomear variáveis em JS?", opcoes: ["snake_case", "camelCase", "PascalCase", "kebab-case"], respostaCorreta: 1, explicacao: "Use camelCase em JS!"},
    {pergunta: "let x; - x vale?", opcoes: ["null", "undefined", "0", "''"], respostaCorreta: 1, explicacao: "Sem valor = undefined!"},
    {pergunta: "const para array pode adicionar itens?", opcoes: ["Não", "Sim", "Só com push", "Erro"], respostaCorreta: 1, explicacao: "const impede reatribuição, não modificação!"},
    {pergunta: "Variável não pode começar com?", opcoes: ["Letra", "_ ou $", "Número", "Maiúscula"], respostaCorreta: 2, explicacao: "Não pode começar com número!"},
    {pergunta: "typeof retorna tipo de?", opcoes: ["Valor", "Variável", "Função", "Objeto"], respostaCorreta: 0, explicacao: "typeof retorna tipo do valor!"},
    {pergunta: "let idade = 25; - tipo?", opcoes: ["string", "number", "integer", "float"], respostaCorreta: 1, explicacao: "Números são tipo number!"},

    // Tipos de dados (16-30)
    {pergunta: "Tipo de dado de 'texto'?", opcoes: ["text", "string", "char", "varchar"], respostaCorreta: 1, explicacao: "Texto é tipo string!"},
    {pergunta: "Tipo de true/false?", opcoes: ["bool", "boolean", "binary", "bit"], respostaCorreta: 1, explicacao: "Verdadeiro/falso é boolean!"},
    {pergunta: "let x = null; - tipo?", opcoes: ["null", "object", "undefined", "empty"], respostaCorreta: 1, explicacao: "Bug histórico: typeof null = object!"},
    {pergunta: "Como declarar string?", opcoes: ["Aspas simples ou duplas", "Só aspas duplas", "Só aspas simples", "Sem aspas"], respostaCorreta: 0, explicacao: "Use 'texto' ou \"texto\"!"},
    {pergunta: "Template string usa?", opcoes: ["''", "\"\"", "``", "()"], respostaCorreta: 2, explicacao: "Template string usa crase ``!"},
    {pergunta: "5 + '5' resulta em?", opcoes: ["10", "'55'", "Erro", "undefined"], respostaCorreta: 1, explicacao: "Concatena: '55'!"},
    {pergunta: "5 - '3' resulta em?", opcoes: ["'2'", "2", "Erro", "undefined"], respostaCorreta: 1, explicacao: "Subtrai: 2!"},
    {pergunta: "Array se cria com?", opcoes: ["{}", "[]", "()", "<>"], respostaCorreta: 1, explicacao: "Arrays usam colchetes []!"},
    {pergunta: "Objeto se cria com?", opcoes: ["{}", "[]", "()", "new"], respostaCorreta: 0, explicacao: "Objetos usam chaves {}!"},
    {pergunta: "NaN significa?", opcoes: ["Null", "Not a Number", "Number", "Nada"], respostaCorreta: 1, explicacao: "NaN = Not a Number!"},
    {pergunta: "0 / 0 resulta em?", opcoes: ["0", "Infinity", "NaN", "Erro"], respostaCorreta: 2, explicacao: "0/0 = NaN!"},
    {pergunta: "5 / 0 resulta em?", opcoes: ["0", "Infinity", "NaN", "Erro"], respostaCorreta: 1, explicacao: "Divisão por 0 = Infinity!"},
    {pergunta: "typeof [] retorna?", opcoes: ["array", "object", "list", "Array"], respostaCorreta: 1, explicacao: "Array é tipo object!"},
    {pergunta: "typeof function(){} retorna?", opcoes: ["object", "function", "Function", "method"], respostaCorreta: 1, explicacao: "Funções têm tipo próprio!"},
    {pergunta: "Comentário de linha usa?", opcoes: ["//", "/* */", "#", "<!--"], respostaCorreta: 0, explicacao: "Linha: // Bloco: /* */!"},

    // Operadores básicos (31-40)
    {pergunta: "+ - * / são operadores?", opcoes: ["Lógicos", "Aritméticos", "Comparação", "Bit"], respostaCorreta: 1, explicacao: "São operadores aritméticos!"},
    {pergunta: "++ faz o quê?", opcoes: ["Decrementa", "Incrementa", "Multiplica", "Soma"], respostaCorreta: 1, explicacao: "++ incrementa (adiciona 1)!"},
    {pergunta: "== compara?", opcoes: ["Valor e tipo", "Só valor", "Só tipo", "Referência"], respostaCorreta: 1, explicacao: "== compara só valor!"},
    {pergunta: "=== compara?", opcoes: ["Só valor", "Valor e tipo", "Só tipo", "Nada"], respostaCorreta: 1, explicacao: "=== compara valor E tipo!"},
    {pergunta: "5 == '5' retorna?", opcoes: ["true", "false", "Erro", "undefined"], respostaCorreta: 0, explicacao: "== converte tipos: true!"},
    {pergunta: "5 === '5' retorna?", opcoes: ["true", "false", "Erro", "undefined"], respostaCorreta: 1, explicacao: "=== tipos diferentes: false!"},
    {pergunta: "! é operador?", opcoes: ["Multiplicação", "Negação", "Diferente", "Fatorial"], respostaCorreta: 1, explicacao: "! é negação (NOT)!"},
    {pergunta: "&& é operador?", opcoes: ["OR", "AND", "NOT", "XOR"], respostaCorreta: 1, explicacao: "&& é AND lógico!"},
    {pergunta: "|| é operador?", opcoes: ["AND", "OR", "NOT", "XOR"], respostaCorreta: 1, explicacao: "|| é OR lógico!"},
    {pergunta: "% é operador de?", opcoes: ["Porcentagem", "Módulo (resto)", "Divisão", "Raiz"], respostaCorreta: 1, explicacao: "% retorna resto da divisão!"},

    // Conceitos básicos (41-50)
    {pergunta: "JavaScript é case-sensitive?", opcoes: ["Não", "Sim", "Às vezes", "Depende"], respostaCorreta: 1, explicacao: "JS diferencia maiúsculas/minúsculas!"},
    {pergunta: "let nome, idade; - declara?", opcoes: ["1 variável", "2 variáveis", "Erro", "Array"], respostaCorreta: 1, explicacao: "Declara múltiplas com vírgula!"},
    {pergunta: "Toda instrução JS termina com?", opcoes: [".", ",", ";", ":"], respostaCorreta: 2, explicacao: "Instruções terminam com ;"},
    {pergunta: "console.log() faz o quê?", opcoes: ["Apaga", "Imprime no console", "Lê dados", "Para código"], respostaCorreta: 1, explicacao: "log() exibe no console!"},
    {pergunta: "alert() faz o quê?", opcoes: ["Alerta visual", "Log", "Erro", "Warning"], respostaCorreta: 0, explicacao: "alert() mostra popup!"},
    {pergunta: "prompt() faz o quê?", opcoes: ["Alerta", "Recebe input", "Imprime", "Erro"], respostaCorreta: 1, explicacao: "prompt() pede entrada do usuário!"},
    {pergunta: "Qual está em português?", opcoes: ["let", "const", "var", "Nenhuma"], respostaCorreta: 3, explicacao: "JS usa palavras em inglês!"},
    {pergunta: "JS roda onde?", opcoes: ["Só navegador", "Só servidor", "Ambos", "Nenhum"], respostaCorreta: 2, explicacao: "JS roda no navegador e servidor (Node)!"},
    {pergunta: "Arquivo JS tem extensão?", opcoes: [".javascript", ".js", ".script", ".java"], respostaCorreta: 1, explicacao: "Arquivos JS usam .js!"},
    {pergunta: "Como importar JS no HTML?", opcoes: ["<js>", "<script>", "<code>", "<javascript>"], respostaCorreta: 1, explicacao: "Use tag <script>!"}
];

// MODO INTERMEDIÁRIO - 50 questões sobre loops, condicionais, funções básicas, escopo
const perguntasIntermediario = [
    // Condicionais if/else (1-12)
    {pergunta: "if serve para?", opcoes: ["Loop", "Condição", "Declarar variável", "Função"], respostaCorreta: 1, explicacao: "if executa código se condição for verdadeira!"},
    {pergunta: "else executa quando?", opcoes: ["Sempre", "if for false", "if for true", "Nunca"], respostaCorreta: 1, explicacao: "else executa quando if é falso!"},
    {pergunta: "else if serve para?", opcoes: ["Loop", "Condição adicional", "Erro", "Função"], respostaCorreta: 1, explicacao: "else if testa outra condição!"},
    {pergunta: "if (5 > 3) {} - executa?", opcoes: ["Sim", "Não", "Erro", "Depende"], respostaCorreta: 0, explicacao: "5 > 3 é true, executa!"},
    {pergunta: "Operador ternário: a ? b : c", opcoes: ["Loop", "if/else curto", "Função", "Array"], respostaCorreta: 1, explicacao: "Ternário é if/else em uma linha!"},
    {pergunta: "true ? 'sim' : 'não' retorna?", opcoes: ["'sim'", "'não'", "true", "Erro"], respostaCorreta: 0, explicacao: "true retorna primeiro valor: 'sim'!"},
    {pergunta: "switch serve para?", opcoes: ["Loop", "Múltiplas condições", "Função", "Array"], respostaCorreta: 1, explicacao: "switch testa múltiplos valores!"},
    {pergunta: "break em switch faz?", opcoes: ["Erro", "Sai do switch", "Continua", "Loop"], respostaCorreta: 1, explicacao: "break sai do switch!"},
    {pergunta: "default em switch?", opcoes: ["Primeiro caso", "Caso padrão", "Erro", "Loop"], respostaCorreta: 1, explicacao: "default executa se nenhum case match!"},
    {pergunta: "if sem {} executa?", opcoes: ["Nada", "Só próxima linha", "Erro", "Tudo"], respostaCorreta: 1, explicacao: "Sem {}, if executa só próxima linha!"},
    {pergunta: "if (0) {} - executa?", opcoes: ["Sim", "Não", "Erro", "Depende"], respostaCorreta: 1, explicacao: "0 é falsy, não executa!"},
    {pergunta: "if ('') {} - executa?", opcoes: ["Sim", "Não", "Erro", "Depende"], respostaCorreta: 1, explicacao: "String vazia é falsy!"},

    // Loops (13-25)
    {pergunta: "for serve para?", opcoes: ["Condição", "Repetição", "Função", "Variável"], respostaCorreta: 1, explicacao: "for cria loops (repetições)!"},
    {pergunta: "while executa quando?", opcoes: ["Uma vez", "Enquanto condição true", "Nunca", "Sempre"], respostaCorreta: 1, explicacao: "while repete enquanto condição for true!"},
    {pergunta: "do...while executa mínimo?", opcoes: ["0 vezes", "1 vez", "2 vezes", "Infinito"], respostaCorreta: 1, explicacao: "do...while executa pelo menos 1 vez!"},
    {pergunta: "break em loop faz?", opcoes: ["Continua", "Sai do loop", "Erro", "Reinicia"], respostaCorreta: 1, explicacao: "break sai do loop imediatamente!"},
    {pergunta: "continue em loop faz?", opcoes: ["Sai", "Pula para próxima iteração", "Erro", "Para"], respostaCorreta: 1, explicacao: "continue pula para próxima iteração!"},
    {pergunta: "for (let i = 0; i < 3; i++) - executa?", opcoes: ["2 vezes", "3 vezes", "4 vezes", "Infinito"], respostaCorreta: 1, explicacao: "i: 0, 1, 2 = 3 vezes!"},
    {pergunta: "Loop infinito acontece quando?", opcoes: ["Condição sempre true", "break", "continue", "Erro"], respostaCorreta: 0, explicacao: "Condição sempre true = infinito!"},
    {pergunta: "for...in itera sobre?", opcoes: ["Valores", "Índices/chaves", "Números", "Strings"], respostaCorreta: 1, explicacao: "for...in itera chaves de objeto!"},
    {pergunta: "for...of itera sobre?", opcoes: ["Chaves", "Valores", "Índices", "Nada"], respostaCorreta: 1, explicacao: "for...of itera valores de iterável!"},
    {pergunta: "arr.forEach() faz?", opcoes: ["Cria array", "Itera array", "Remove item", "Ordena"], respostaCorreta: 1, explicacao: "forEach executa função para cada item!"},
    {pergunta: "while (true) {} - o que acontece?", opcoes: ["Erro", "Loop infinito", "Executa 1 vez", "Nada"], respostaCorreta: 1, explicacao: "Condição sempre true = infinito!"},
    {pergunta: "for vazio: for(;;) {} faz?", opcoes: ["Erro", "Loop infinito", "Nada", "1 iteração"], respostaCorreta: 1, explicacao: "Sem condição = loop infinito!"},

    // Funções básicas (26-38)
    {pergunta: "function declara?", opcoes: ["Variável", "Função", "Loop", "Condição"], respostaCorreta: 1, explicacao: "function cria funções!"},
    {pergunta: "Função sem return retorna?", opcoes: ["null", "undefined", "0", "false"], respostaCorreta: 1, explicacao: "Sem return = undefined!"},
    {pergunta: "return faz?", opcoes: ["Loop", "Retorna valor", "Condição", "Variável"], respostaCorreta: 1, explicacao: "return devolve valor da função!"},
    {pergunta: "Parâmetro é?", opcoes: ["Retorno", "Entrada da função", "Loop", "Condição"], respostaCorreta: 1, explicacao: "Parâmetro recebe valores!"},
    {pergunta: "Argumento é?", opcoes: ["Parâmetro", "Valor passado", "Retorno", "Função"], respostaCorreta: 1, explicacao: "Argumento é valor real passado!"},
    {pergunta: "function soma(a, b) {} - quantos parâmetros?", opcoes: ["1", "2", "3", "0"], respostaCorreta: 1, explicacao: "Tem 2 parâmetros: a e b!"},
    {pergunta: "Arrow function: () => {} é?", opcoes: ["Erro", "Função curta", "Loop", "Array"], respostaCorreta: 1, explicacao: "Arrow é sintaxe curta de função!"},
    {pergunta: "const fn = () => 5 - retorna?", opcoes: ["undefined", "5", "Erro", "null"], respostaCorreta: 1, explicacao: "Arrow sem {} retorna expressão: 5!"},
    {pergunta: "Função anônima é?", opcoes: ["Com nome", "Sem nome", "Erro", "Loop"], respostaCorreta: 1, explicacao: "Função anônima não tem nome!"},
    {pergunta: "Callback é?", opcoes: ["Retorno", "Função como argumento", "Loop", "Erro"], respostaCorreta: 1, explicacao: "Callback é função passada como arg!"},
    {pergunta: "function pode estar dentro de if?", opcoes: ["Não", "Sim", "Erro", "Só var"], respostaCorreta: 1, explicacao: "Funções podem estar em qualquer lugar!"},
    {pergunta: "Posso chamar função antes de declarar?", opcoes: ["Não", "Sim, hoisting", "Erro", "Depende"], respostaCorreta: 1, explicacao: "Function declaration sofre hoisting!"},
    {pergunta: "Quantos returns pode ter?", opcoes: ["0", "1", "Quantos quiser", "2"], respostaCorreta: 2, explicacao: "Pode ter vários, mas executa só 1!"},

    // Escopo e conceitos (39-50)
    {pergunta: "Escopo é?", opcoes: ["Tipo", "Onde variável existe", "Loop", "Função"], respostaCorreta: 1, explicacao: "Escopo define onde variável é acessível!"},
    {pergunta: "let/const têm escopo de?", opcoes: ["Função", "Bloco {}", "Global", "Arquivo"], respostaCorreta: 1, explicacao: "let/const = escopo de bloco!"},
    {pergunta: "var tem escopo de?", opcoes: ["Bloco", "Função", "Loop", "If"], respostaCorreta: 1, explicacao: "var = escopo de função!"},
    {pergunta: "Variável global é acessível?", opcoes: ["Só em função", "Em todo código", "Só em bloco", "Nunca"], respostaCorreta: 1, explicacao: "Global = acessível em qualquer lugar!"},
    {pergunta: "if (true) {let x = 1} console.log(x)?", opcoes: ["1", "undefined", "Erro", "null"], respostaCorreta: 2, explicacao: "x só existe no bloco if!"},
    {pergunta: "null vs undefined?", opcoes: ["Iguais", "undefined=vazio, null=intencional", "Opostos", "Tipos iguais"], respostaCorreta: 1, explicacao: "undefined=ausência, null=vazio proposital!"},
    {pergunta: "Truthy value é?", opcoes: ["true", "Valor considerado true", "1", "Função"], respostaCorreta: 1, explicacao: "Truthy = convertido para true!"},
    {pergunta: "Falsy values: 0, '', null, undefined, false, NaN?", opcoes: ["Não", "Sim", "Só 0", "Só false"], respostaCorreta: 1, explicacao: "Todos são falsy!"},
    {pergunta: "!! converte para?", opcoes: ["String", "Boolean", "Number", "Null"], respostaCorreta: 1, explicacao: "!! força conversão boolean!"},
    {pergunta: "Short-circuit: && retorna?", opcoes: ["true", "Primeiro falsy ou último", "false", "Erro"], respostaCorreta: 1, explicacao: "&& retorna primeiro falsy ou último valor!"},
    {pergunta: "Short-circuit: || retorna?", opcoes: ["false", "Primeiro truthy ou último", "true", "Erro"], respostaCorreta: 1, explicacao: "|| retorna primeiro truthy ou último!"},
    {pergunta: "Nullish coalescing: ?? retorna?", opcoes: ["Sempre null", "Valor não-null/undefined", "Erro", "Boolean"], respostaCorreta: 1, explicacao: "?? retorna se não for null/undefined!"}
];

// MODO AVANÇADO - 50 questões sobre hoisting, closures, async, prototypes, avançados
const perguntasAvancado = [
    // Hoisting e TDZ (1-10)
    {pergunta: "O que é hoisting?", opcoes: ["Deletar", "Elevar declarações ao topo", "Criar global", "Otimizar"], respostaCorreta: 1, explicacao: "Hoisting eleva declarações para o topo do escopo!"},
    {pergunta: "O que é Temporal Dead Zone?", opcoes: ["Bug", "Período let/const inacessíveis", "Timeout", "Erro"], respostaCorreta: 1, explicacao: "TDZ: entre início do bloco e declaração!"},
    {pergunta: "console.log(x); var x = 5 imprime?", opcoes: ["5", "undefined", "Erro", "null"], respostaCorreta: 1, explicacao: "var sofre hoisting, mas atribuição não!"},
    {pergunta: "console.log(y); let y = 5 gera?", opcoes: ["5", "undefined", "ReferenceError", "null"], respostaCorreta: 2, explicacao: "let na TDZ gera ReferenceError!"},
    {pergunta: "Function declaration sofre hoisting?", opcoes: ["Não", "Sim, completo", "Só nome", "Erro"], respostaCorreta: 1, explicacao: "Function declaration: hoisting completo!"},
    {pergunta: "Function expression sofre hoisting?", opcoes: ["Sim", "Só variável", "Não", "Depende"], respostaCorreta: 1, explicacao: "Variável sofre, função não!"},
    {pergunta: "var no global vira propriedade de?", opcoes: ["document", "window", "global", "this"], respostaCorreta: 1, explicacao: "var global → window property!"},
    {pergunta: "let/const no global viram window?", opcoes: ["Sim", "Não", "Às vezes", "Erro"], respostaCorreta: 1, explicacao: "let/const não viram window properties!"},
    {pergunta: "Hoisting move código fisicamente?", opcoes: ["Sim", "Não, só conceitualmente", "Às vezes", "Erro"], respostaCorreta: 1, explicacao: "Hoisting é conceitual, não literal!"},
    {pergunta: "class sofre hoisting?", opcoes: ["Não", "Sim, mas TDZ", "Sim, completo", "Erro"], respostaCorreta: 1, explicacao: "class sofre hoisting mas fica na TDZ!"},

    // Closures e Escopo (11-20)
    {pergunta: "O que é closure?", opcoes: ["Função fechada", "Função acessa escopo externo", "Loop", "Erro"], respostaCorreta: 1, explicacao: "Closure 'lembra' escopo onde foi criada!"},
    {pergunta: "Closures são úteis para?", opcoes: ["Nada", "Encapsular dados privados", "Erro", "Loop"], respostaCorreta: 1, explicacao: "Closures criam dados privados!"},
    {pergunta: "Lexical scope significa?", opcoes: ["Dinâmico", "Definido onde função foi escrita", "Runtime", "Erro"], respostaCorreta: 1, explicacao: "Lexical: baseado em onde código foi escrito!"},
    {pergunta: "IIFE significa?", opcoes: ["Erro", "Immediately Invoked Function Expression", "Loop", "Class"], respostaCorreta: 1, explicacao: "IIFE: função executada imediatamente!"},
    {pergunta: "IIFE serve para?", opcoes: ["Loop", "Criar escopo privado", "Erro", "Class"], respostaCorreta: 1, explicacao: "IIFE isola variáveis em escopo privado!"},
    {pergunta: "Module pattern usa?", opcoes: ["Classes", "IIFE e closures", "Loops", "Arrays"], respostaCorreta: 1, explicacao: "Module pattern: IIFE + closures!"},
    {pergunta: "Variável sem var/let/const vira?", opcoes: ["Local", "Global", "Erro", "undefined"], respostaCorreta: 1, explicacao: "Sem declaração = global (strict mode: erro)!"},
    {pergunta: "'use strict' faz?", opcoes: ["Nada", "Modo estrito, menos permissivo", "Erro", "Otimiza"], respostaCorreta: 1, explicacao: "strict mode: regras mais rígidas!"},
    {pergunta: "this em arrow function?", opcoes: ["Próprio this", "Herda contexto externo", "window", "undefined"], respostaCorreta: 1, explicacao: "Arrow não tem próprio this!"},
    {pergunta: "this em função normal?", opcoes: ["Fixo", "Depende de como chamada", "window", "undefined"], respostaCorreta: 1, explicacao: "this depende do contexto de chamada!"},

    // Async e Promises (21-30)
    {pergunta: "Código assíncrono executa?", opcoes: ["Bloqueante", "Não-bloqueante", "Nunca", "Erro"], respostaCorreta: 1, explicacao: "Async = não bloqueia execução!"},
    {pergunta: "setTimeout é?", opcoes: ["Síncrono", "Assíncrono", "Loop", "Erro"], respostaCorreta: 1, explicacao: "setTimeout: assíncrono!"},
    {pergunta: "Promise tem quantos estados?", opcoes: ["1", "2", "3", "4"], respostaCorreta: 2, explicacao: "pending, fulfilled, rejected!"},
    {pergunta: "Promise.then() trata?", opcoes: ["Erro", "Sucesso", "Ambos", "Nada"], respostaCorreta: 1, explicacao: ".then() trata sucesso!"},
    {pergunta: "Promise.catch() trata?", opcoes: ["Sucesso", "Erro", "Ambos", "Nada"], respostaCorreta: 1, explicacao: ".catch() trata erro!"},
    {pergunta: "async function retorna?", opcoes: ["Valor", "Promise", "undefined", "Erro"], respostaCorreta: 1, explicacao: "async sempre retorna Promise!"},
    {pergunta: "await pode ser usado onde?", opcoes: ["Qualquer lugar", "Só em async function", "Global", "Loop"], respostaCorreta: 1, explicacao: "await só dentro de async!"},
    {pergunta: "await faz?", opcoes: ["Loop", "Pausa até Promise resolver", "Erro", "Nada"], respostaCorreta: 1, explicacao: "await espera Promise resolver!"},
    {pergunta: "try/catch captura erro de?", opcoes: ["Só sync", "Sync e async (com await)", "Só async", "Nada"], respostaCorreta: 1, explicacao: "try/catch: sync e async com await!"},
    {pergunta: "Promise.all() faz?", opcoes: ["Uma Promise", "Aguarda todas", "Primeira", "Erro"], respostaCorreta: 1, explicacao: "Promise.all aguarda todas resolverem!"},

    // Objetos Avançados (31-40)
    {pergunta: "const obj = {a:1}; obj.a=2 funciona?", opcoes: ["Não", "Sim", "Erro", "undefined"], respostaCorreta: 1, explicacao: "const impede reatribuição, não mutação!"},
    {pergunta: "Object.freeze() faz?", opcoes: ["Copia", "Torna imutável", "Deleta", "Erro"], respostaCorreta: 1, explicacao: "freeze torna objeto imutável!"},
    {pergunta: "Object.seal() permite?", opcoes: ["Adicionar prop", "Modificar valores", "Deletar prop", "Nada"], respostaCorreta: 1, explicacao: "seal: pode modificar, não add/delete!"},
    {pergunta: "Spread {...obj} faz?", opcoes: ["Erro", "Cópia rasa", "Cópia profunda", "Deleta"], respostaCorreta: 1, explicacao: "Spread: shallow copy!"},
    {pergunta: "Object.assign() faz?", opcoes: ["Compara", "Copia propriedades", "Deleta", "Cria"], respostaCorreta: 1, explicacao: "assign copia props para target!"},
    {pergunta: "Destructuring {a, b} = obj faz?", opcoes: ["Erro", "Extrai propriedades", "Deleta", "Cria"], respostaCorreta: 1, explicacao: "Destructuring extrai props!"},
    {pergunta: "Shorthand {nome} quando nome='Ana'?", opcoes: ["Erro", "{nome: 'Ana'}", "undefined", "null"], respostaCorreta: 1, explicacao: "Shorthand: {nome} = {nome: nome}!"},
    {pergunta: "Computed property {[key]: value}?", opcoes: ["Erro", "Usa variável como chave", "Array", "String"], respostaCorreta: 1, explicacao: "Computed: valor da var vira chave!"},
    {pergunta: "Object.keys() retorna?", opcoes: ["Valores", "Array de chaves", "Objeto", "String"], respostaCorreta: 1, explicacao: "keys() retorna array de chaves!"},
    {pergunta: "Object.values() retorna?", opcoes: ["Chaves", "Array de valores", "Objeto", "String"], respostaCorreta: 1, explicacao: "values() retorna array de valores!"},

    // Prototypes e Classes (41-50)
    {pergunta: "Prototype é?", opcoes: ["Erro", "Objeto base para herança", "Função", "Array"], respostaCorreta: 1, explicacao: "Prototype: objeto de onde outros herdam!"},
    {pergunta: "Toda função tem?", opcoes: ["Array", "prototype", "Erro", "null"], respostaCorreta: 1, explicacao: "Toda função tem prototype!"},
    {pergunta: "__proto__ aponta para?", opcoes: ["null", "Prototype do construtor", "window", "Erro"], respostaCorreta: 1, explicacao: "__proto__ aponta para prototype!"},
    {pergunta: "class é?", opcoes: ["Tipo novo", "Syntax sugar para prototype", "Erro", "Função"], respostaCorreta: 1, explicacao: "class é syntax sugar de prototype!"},
    {pergunta: "constructor em class?", opcoes: ["Erro", "Método inicializador", "Propriedade", "Static"], respostaCorreta: 1, explicacao: "constructor inicializa instância!"},
    {pergunta: "extends faz?", opcoes: ["Erro", "Herança de classe", "Copia", "Deleta"], respostaCorreta: 1, explicacao: "extends cria herança!"},
    {pergunta: "super() faz?", opcoes: ["Erro", "Chama construtor pai", "Deleta", "Cria"], respostaCorreta: 1, explicacao: "super chama construtor da classe pai!"},
    {pergunta: "static method pertence a?", opcoes: ["Instância", "Classe", "Prototype", "window"], respostaCorreta: 1, explicacao: "static pertence à classe, não instância!"},
    {pergunta: "new Classe() faz?", opcoes: ["Erro", "Cria instância", "Deleta", "Copia"], respostaCorreta: 1, explicacao: "new cria nova instância!"},
    {pergunta: "instanceof verifica?", opcoes: ["Tipo primitivo", "Se é instância de classe", "Valor", "Erro"], respostaCorreta: 1, explicacao: "instanceof verifica se objeto é instância!"}
];

// ========================================
// RESUMOS EDUCATIVOS POR NÍVEL
// ========================================
// Cada nível tem um resumo explicativo dos conceitos
// que serão abordados nas perguntas do quiz

// RESUMO: INICIANTE
const resumoIniciante = `
    <h3>Fundamentos Básicos de JavaScript</h3>
    <p>Bem-vindo ao nível iniciante! Aqui você vai aprender os conceitos fundamentais do JavaScript.</p>

    <h3>1. Variáveis: let, const e var</h3>
    <p><strong><code>let</code></strong> - Declare variáveis que podem mudar de valor:</p>
    <ul>
        <li>Escopo de bloco (só existe dentro de <code>{ }</code>)</li>
        <li>Pode ter seu valor alterado</li>
        <li>Exemplo: <code>let idade = 25; idade = 26;</code></li>
    </ul>

    <p><strong><code>const</code></strong> - Declare constantes (valores fixos):</p>
    <ul>
        <li>Escopo de bloco</li>
        <li>NÃO pode ser reatribuída</li>
        <li>Exemplo: <code>const PI = 3.14;</code></li>
        <li>Dica: Use <code>const</code> por padrão!</li>
    </ul>

    <p><strong><code>var</code></strong> - Forma antiga (evite usar):</p>
    <ul>
        <li>Escopo de função ou global</li>
        <li>Pode causar bugs inesperados</li>
        <li>Use <code>let</code> e <code>const</code> no lugar!</li>
    </ul>

    <h3>2. Tipos de Dados</h3>
    <ul>
        <li><strong>String</strong>: Texto entre aspas → <code>"olá"</code> ou <code>'mundo'</code></li>
        <li><strong>Number</strong>: Números → <code>42</code>, <code>3.14</code></li>
        <li><strong>Boolean</strong>: Verdadeiro ou falso → <code>true</code>, <code>false</code></li>
        <li><strong>Undefined</strong>: Variável sem valor atribuído</li>
        <li><strong>Null</strong>: Valor vazio intencional</li>
        <li><strong>Array</strong>: Lista de valores → <code>[1, 2, 3]</code></li>
        <li><strong>Object</strong>: Coleção de propriedades → <code>{nome: "João"}</code></li>
    </ul>

    <h3>3. Operadores Básicos</h3>
    <ul>
        <li><strong>Aritméticos</strong>: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code></li>
        <li><strong>Comparação</strong>: <code>==</code> (valor), <code>===</code> (valor e tipo)</li>
        <li><strong>Lógicos</strong>: <code>&&</code> (AND), <code>||</code> (OR), <code>!</code> (NOT)</li>
        <li><strong>Incremento/Decremento</strong>: <code>++</code>, <code>--</code></li>
    </ul>

    <h3>4. Conceitos Importantes</h3>
    <ul>
        <li>JavaScript é <strong>case-sensitive</strong>: <code>nome</code> ≠ <code>Nome</code></li>
        <li>Use <strong>camelCase</strong> para nomes: <code>minhaVariavel</code></li>
        <li>Variáveis não podem começar com número</li>
        <li><code>console.log()</code> exibe mensagens no console</li>
    </ul>
`;

// RESUMO: INTERMEDIÁRIO
const resumoIntermediario = `
    <h3>Conceitos Intermediários de JavaScript</h3>
    <p>Agora vamos explorar estruturas de controle, loops e funções!</p>

    <h3>1. Condicionais (if/else/switch)</h3>
    <p><strong>if/else</strong> - Executa código baseado em condições:</p>
    <ul>
        <li><code>if (condicao) { }</code> - Executa se condição for verdadeira</li>
        <li><code>else { }</code> - Executa se condição for falsa</li>
        <li><code>else if (outraCondicao) { }</code> - Testa outra condição</li>
        <li><strong>Operador ternário</strong>: <code>condicao ? valorTrue : valorFalse</code></li>
    </ul>

    <p><strong>switch</strong> - Compara valor com múltiplos casos:</p>
    <ul>
        <li>Útil quando tem muitas opções para verificar</li>
        <li>Use <code>break</code> para sair do switch</li>
        <li><code>default</code> é o caso padrão</li>
    </ul>

    <h3>2. Loops (Repetições)</h3>
    <p><strong>for</strong> - Loop com contador:</p>
    <ul>
        <li><code>for (let i = 0; i < 10; i++) { }</code></li>
        <li>Ideal quando você sabe quantas vezes vai repetir</li>
    </ul>

    <p><strong>while</strong> - Repete enquanto condição for verdadeira:</p>
    <ul>
        <li><code>while (condicao) { }</code></li>
        <li>Pode nunca executar se condição inicial for falsa</li>
    </ul>

    <p><strong>do...while</strong> - Executa pelo menos uma vez:</p>
    <ul>
        <li><code>do { } while (condicao)</code></li>
    </ul>

    <p><strong>Controle de loops</strong>:</p>
    <ul>
        <li><code>break</code> - Sai do loop imediatamente</li>
        <li><code>continue</code> - Pula para próxima iteração</li>
    </ul>

    <h3>3. Funções Básicas</h3>
    <p><strong>Declaração de função</strong>:</p>
    <ul>
        <li><code>function nome(parametros) { return valor; }</code></li>
        <li>Parâmetros são entradas da função</li>
        <li><code>return</code> devolve o resultado</li>
        <li>Sem <code>return</code>, retorna <code>undefined</code></li>
    </ul>

    <p><strong>Arrow Function</strong> - Sintaxe moderna e curta:</p>
    <ul>
        <li><code>const nome = (parametros) => { return valor; }</code></li>
        <li>Se só tem uma expressão: <code>const soma = (a, b) => a + b</code></li>
    </ul>

    <h3>4. Escopo</h3>
    <ul>
        <li><strong>Escopo global</strong>: Variável acessível em todo código</li>
        <li><strong>Escopo de bloco</strong>: <code>let/const</code> só existem dentro de <code>{ }</code></li>
        <li><strong>Escopo de função</strong>: <code>var</code> existe na função toda</li>
    </ul>

    <h3>5. Valores Truthy e Falsy</h3>
    <p><strong>Falsy</strong> (convertidos para <code>false</code>):</p>
    <ul>
        <li><code>false</code>, <code>0</code>, <code>""</code> (string vazia), <code>null</code>, <code>undefined</code>, <code>NaN</code></li>
    </ul>
    <p><strong>Truthy</strong>: Todos os outros valores!</p>
`;

// RESUMO: AVANÇADO
const resumoAvancado = `
    <h3>Conceitos Avançados de JavaScript</h3>
    <p>Prepare-se para os tópicos mais complexos e poderosos do JavaScript!</p>

    <h3>1. Hoisting (Elevação)</h3>
    <p>Hoisting é quando declarações são "elevadas" para o topo do escopo:</p>
    <ul>
        <li><strong>var</strong>: Declaração é elevada, mas atribuição não → fica <code>undefined</code></li>
        <li><strong>let/const</strong>: São elevadas mas ficam na "Temporal Dead Zone" → gera erro se acessar antes</li>
        <li><strong>function</strong>: Declaração completa é elevada → pode usar antes de declarar!</li>
    </ul>

    <h3>2. Temporal Dead Zone (TDZ)</h3>
    <p>Período entre o início do bloco e a declaração onde <code>let/const</code> não podem ser acessadas:</p>
    <ul>
        <li>Tentar acessar variável na TDZ gera <code>ReferenceError</code></li>
        <li>Isso evita bugs de usar variáveis antes de declarar</li>
    </ul>

    <h3>3. Closures (Fechamentos)</h3>
    <p>Closure é quando uma função "lembra" das variáveis do escopo onde foi criada:</p>
    <ul>
        <li>Função interna tem acesso às variáveis da função externa</li>
        <li>Mesmo depois da função externa terminar!</li>
        <li>Útil para criar dados privados e callbacks</li>
    </ul>

    <h3>4. this (Contexto)</h3>
    <ul>
        <li><strong>Função normal</strong>: <code>this</code> depende de COMO a função foi chamada</li>
        <li><strong>Arrow function</strong>: <code>this</code> herda do contexto externo (lexical)</li>
        <li><strong>Métodos de objeto</strong>: <code>this</code> aponta para o objeto</li>
    </ul>

    <h3>5. Programação Assíncrona</h3>
    <p><strong>Promises</strong> - Representam operações futuras:</p>
    <ul>
        <li>Estados: <code>pending</code>, <code>fulfilled</code>, <code>rejected</code></li>
        <li><code>.then()</code> trata sucesso</li>
        <li><code>.catch()</code> trata erro</li>
    </ul>

    <p><strong>async/await</strong> - Sintaxe moderna para Promises:</p>
    <ul>
        <li><code>async function</code> sempre retorna Promise</li>
        <li><code>await</code> pausa execução até Promise resolver</li>
        <li>Só funciona dentro de <code>async function</code></li>
    </ul>

    <h3>6. Objetos Avançados</h3>
    <ul>
        <li><strong>Object.freeze()</strong>: Torna objeto imutável</li>
        <li><strong>Object.seal()</strong>: Permite modificar valores, mas não adicionar/remover propriedades</li>
        <li><strong>Spread</strong> <code>{...obj}</code>: Cria cópia rasa</li>
        <li><strong>Destructuring</strong> <code>const {nome} = obj</code>: Extrai propriedades</li>
    </ul>

    <h3>7. Prototypes e Classes</h3>
    <ul>
        <li><strong>Prototype</strong>: Objeto base de onde outros objetos herdam</li>
        <li><strong>class</strong>: Syntax sugar para criar objetos com prototype</li>
        <li><strong>constructor</strong>: Método que inicializa a instância</li>
        <li><strong>extends</strong>: Cria herança entre classes</li>
        <li><strong>super()</strong>: Chama construtor da classe pai</li>
    </ul>

    <h3>8. IIFE (Immediately Invoked Function Expression)</h3>
    <p>Função executada imediatamente após ser criada:</p>
    <ul>
        <li><code>(function() { /* código */ })();</code></li>
        <li>Cria escopo privado, isolando variáveis</li>
        <li>Útil para evitar poluir escopo global</li>
    </ul>
`;

// RESUMO: DESAFIO
const resumoDesafio = `
    <h3>Modo Desafio - Mix de Todos os Níveis</h3>
    <p>Este é o modo mais desafiador! Você enfrentará perguntas de TODOS os níveis misturadas.</p>

    <h3>O que esperar:</h3>
    <ul>
        <li><strong>15 perguntas aleatórias</strong> de iniciante, intermediário e avançado</li>
        <li>Tópicos variados: variáveis, funções, loops, closures, async, prototypes...</li>
        <li>Perfeito para testar seu conhecimento geral de JavaScript</li>
    </ul>

    <h3>Dicas para se dar bem:</h3>
    <ul>
        <li>Leia cada pergunta com atenção</li>
        <li>Pense nos conceitos fundamentais antes de responder</li>
        <li>Se errar, leia a explicação para aprender!</li>
        <li>Não desanime com perguntas difíceis - elas te fazem crescer</li>
    </ul>

    <h3>Tópicos que podem aparecer:</h3>
    <ul>
        <li>Diferenças entre <code>let</code>, <code>const</code> e <code>var</code></li>
        <li>Tipos de dados e operadores</li>
        <li>Estruturas de controle: <code>if/else</code>, <code>switch</code></li>
        <li>Loops: <code>for</code>, <code>while</code>, <code>forEach</code></li>
        <li>Funções: declaração, arrow, parâmetros, return</li>
        <li>Escopo e closures</li>
        <li>Hoisting e Temporal Dead Zone</li>
        <li>Promises e async/await</li>
        <li>Objetos, arrays e seus métodos</li>
        <li>Prototypes e classes</li>
    </ul>

    <p><strong>Boa sorte! Você está pronto para o desafio!</strong></p>
`;

// Objeto que mapeia cada modo ao seu resumo
const resumosPorModo = {
    iniciante: resumoIniciante,
    intermediario: resumoIntermediario,
    avancado: resumoAvancado,
    desafio: resumoDesafio
};

// ========================================
// RESUMOS EDUCATIVOS DA BIBLIOTECA
// ========================================
// Resumos extensos e detalhados para cada tema da biblioteca

// RESUMO: VARIÁVEIS
const resumoBibliotecaVariaveis = `
    <h3>📦 Variáveis em JavaScript - Guia Completo</h3>
    <p>Variáveis são <strong>containers</strong> que armazenam valores na memória. Em JavaScript, temos três formas de declarar variáveis: <code>var</code>, <code>let</code> e <code>const</code>.</p>

    <h3>1. const - A Forma Mais Segura</h3>
    <p><code>const</code> é a palavra-chave recomendada para declarar valores que <strong>não vão mudar</strong>:</p>

    <ul>
        <li><strong>Escopo de bloco</strong>: Só existe dentro do bloco <code>{ }</code> onde foi declarada</li>
        <li><strong>Não pode ser reatribuída</strong>: Uma vez definida, não pode receber um novo valor</li>
        <li><strong>Deve ser inicializada</strong>: Precisa ter um valor na declaração</li>
    </ul>

    <p><strong>Exemplo:</strong></p>
    <pre><code>const PI = 3.14159;
const nome = "João";
const idade = 25;

// Isso gera ERRO:
PI = 3.14; // TypeError: Assignment to constant variable</code></pre>

    <p><strong>⚠️ Importante sobre const com objetos e arrays:</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 30 };
pessoa.idade = 31; // ✅ FUNCIONA! Pode modificar propriedades

const cores = ["azul", "verde"];
cores.push("vermelho"); // ✅ FUNCIONA! Pode modificar o array

// Mas NÃO pode reatribuir:
pessoa = {}; // ❌ ERRO!
cores = []; // ❌ ERRO!</code></pre>

    <h3>2. let - Para Valores que Mudam</h3>
    <p><code>let</code> é usado quando você precisa <strong>reatribuir</strong> o valor da variável:</p>

    <ul>
        <li><strong>Escopo de bloco</strong>: Igual ao <code>const</code></li>
        <li><strong>Pode ser reatribuída</strong>: Valor pode mudar durante o programa</li>
        <li><strong>Pode ser declarada sem valor inicial</strong>: Fica <code>undefined</code></li>
    </ul>

    <p><strong>Exemplo:</strong></p>
    <pre><code>let pontuacao = 0;
pontuacao = 10; // ✅ FUNCIONA!
pontuacao = pontuacao + 5; // ✅ FUNCIONA!

let nome; // ✅ FUNCIONA! Valor = undefined
nome = "Maria"; // Agora tem valor</code></pre>

    <h3>3. var - A Forma Antiga (Evite!)</h3>
    <p><code>var</code> é a forma antiga de declarar variáveis. <strong>Não use em código moderno!</strong></p>

    <ul>
        <li><strong>Escopo de função ou global</strong>: Não respeita blocos <code>{ }</code></li>
        <li><strong>Pode ser redeclarada</strong>: Permite declarar a mesma variável duas vezes (perigoso!)</li>
        <li><strong>Hoisting problemático</strong>: É "elevada" ao topo, causando bugs</li>
    </ul>

    <p><strong>Problema do var:</strong></p>
    <pre><code>if (true) {
    var x = 10;
}
console.log(x); // 10 - x "vazou" do bloco if!

// Com let/const:
if (true) {
    let y = 10;
}
console.log(y); // ReferenceError - y não existe aqui</code></pre>

    <h3>4. Escopo: Onde as Variáveis Existem</h3>

    <p><strong>Escopo Global:</strong> Variável declarada fora de qualquer função/bloco</p>
    <pre><code>const global = "Visível em todo lugar";

function minhaFuncao() {
    console.log(global); // ✅ Funciona!
}</code></pre>

    <p><strong>Escopo de Bloco:</strong> Variável existe só dentro de <code>{ }</code></p>
    <pre><code>if (true) {
    const dentroDoIf = "Só existe aqui";
    console.log(dentroDoIf); // ✅ Funciona
}
console.log(dentroDoIf); // ❌ ERRO! Não existe aqui</code></pre>

    <p><strong>Escopo de Função:</strong> Variável existe em toda a função</p>
    <pre><code>function exemplo() {
    const dentroFuncao = "Toda a função me vê";

    if (true) {
        console.log(dentroFuncao); // ✅ Funciona
    }

    console.log(dentroFuncao); // ✅ Funciona
}
console.log(dentroFuncao); // ❌ ERRO!</code></pre>

    <h3>5. Hoisting - Elevação de Variáveis</h3>
    <p>JavaScript "move" declarações para o topo do escopo (conceito, não físico):</p>

    <pre><code>// Com var:
console.log(x); // undefined (não dá erro!)
var x = 5;

// É como se fosse:
var x; // declaração é "elevada"
console.log(x); // undefined
x = 5; // atribuição fica no lugar

// Com let/const:
console.log(y); // ReferenceError!
let y = 5; // let fica na "Temporal Dead Zone"</code></pre>

    <h3>6. Temporal Dead Zone (TDZ)</h3>
    <p>É o período entre o início do bloco e a declaração onde <code>let/const</code> não podem ser acessadas:</p>

    <pre><code>{
    // Início da TDZ para 'nome'
    console.log(nome); // ❌ ReferenceError!

    let nome = "João"; // Fim da TDZ
    console.log(nome); // ✅ "João"
}</code></pre>

    <h3>7. Boas Práticas</h3>
    <ul>
        <li>✅ Use <code>const</code> por padrão</li>
        <li>✅ Use <code>let</code> apenas quando precisar reatribuir</li>
        <li>❌ Evite <code>var</code> completamente</li>
        <li>✅ Declare variáveis no início do escopo</li>
        <li>✅ Use nomes descritivos: <code>numeroUsuarios</code> em vez de <code>n</code></li>
        <li>✅ Use camelCase: <code>minhaVariavel</code></li>
        <li>❌ Não comece nomes com números: <code>1usuario</code> é inválido</li>
    </ul>

    <h3>8. Regras de Nomenclatura</h3>
    <ul>
        <li>Pode conter letras, números, <code>_</code> e <code>$</code></li>
        <li>Deve começar com letra, <code>_</code> ou <code>$</code></li>
        <li>JavaScript é case-sensitive: <code>nome</code> ≠ <code>Nome</code></li>
        <li>Não pode usar palavras reservadas: <code>let</code>, <code>if</code>, <code>class</code>, etc.</li>
    </ul>

    <p><strong>Exemplos válidos e inválidos:</strong></p>
    <pre><code>// ✅ Válidos:
const minhaVariavel = 1;
const _privada = 2;
const $elemento = 3;
const nome2 = 4;

// ❌ Inválidos:
const 2nome = 1; // Não pode começar com número
const meu-nome = 2; // Não pode ter hífen
const let = 3; // Palavra reservada</code></pre>
`;

// RESUMO: FUNÇÕES
const resumoBibliotecaFuncoes = `
    <h3>⚙️ Funções em JavaScript - Guia Completo</h3>
    <p>Funções são <strong>blocos de código reutilizáveis</strong> que executam uma tarefa específica. São fundamentais em JavaScript!</p>

    <h3>1. Declaração de Função (Function Declaration)</h3>
    <p>Forma clássica de criar funções:</p>

    <pre><code>function saudar(nome) {
    return "Olá, " + nome + "!";
}

const mensagem = saudar("Maria"); // "Olá, Maria!"</code></pre>

    <p><strong>Características:</strong></p>
    <ul>
        <li>Sofre <strong>hoisting</strong>: pode ser chamada antes da declaração</li>
        <li>Tem nome próprio (útil para recursão e debugging)</li>
        <li>Sintaxe mais tradicional</li>
    </ul>

    <pre><code>// Funciona por causa do hoisting:
console.log(soma(2, 3)); // 5

function soma(a, b) {
    return a + b;
}</code></pre>

    <h3>2. Expressão de Função (Function Expression)</h3>
    <p>Função armazenada em uma variável:</p>

    <pre><code>const saudar = function(nome) {
    return "Olá, " + nome + "!";
};

saudar("João"); // "Olá, João!"</code></pre>

    <p><strong>Diferença do Function Declaration:</strong></p>
    <pre><code>// ❌ ERRO! Não sofre hoisting completo
console.log(multiplicar(2, 3)); // ReferenceError

const multiplicar = function(a, b) {
    return a * b;
};</code></pre>

    <h3>3. Arrow Function (Função Seta) - Moderna e Concisa</h3>
    <p>Sintaxe moderna introduzida no ES6:</p>

    <p><strong>Sintaxe básica:</strong></p>
    <pre><code>// Forma tradicional:
const soma = (a, b) => {
    return a + b;
};

// Retorno implícito (sem chaves):
const soma = (a, b) => a + b;

// Um parâmetro (sem parênteses):
const dobro = n => n * 2;

// Sem parâmetros:
const saudar = () => "Olá!";</code></pre>

    <p><strong>⚠️ Diferença importante: Arrow function NÃO tem próprio 'this'</strong></p>
    <pre><code>const pessoa = {
    nome: "Ana",

    // Função normal: 'this' aponta para pessoa
    saudarNormal: function() {
        console.log("Olá, " + this.nome);
    },

    // Arrow function: 'this' vem do contexto externo
    saudarArrow: () => {
        console.log("Olá, " + this.nome); // undefined!
    }
};

pessoa.saudarNormal(); // "Olá, Ana" ✅
pessoa.saudarArrow(); // "Olá, undefined" ❌</code></pre>

    <h3>4. Parâmetros e Argumentos</h3>
    <p><strong>Parâmetro:</strong> Variável na declaração da função<br>
    <strong>Argumento:</strong> Valor real passado ao chamar</p>

    <pre><code>function cumprimentar(nome, hora) { // parâmetros
    return nome + ", são " + hora + "h";
}

cumprimentar("João", 14); // argumentos
// Retorna: "João, são 14h"</code></pre>

    <p><strong>Parâmetros padrão (Default Parameters):</strong></p>
    <pre><code>function saudar(nome = "Visitante", hora = 12) {
    return nome + ", são " + hora + "h";
}

saudar(); // "Visitante, são 12h"
saudar("Ana"); // "Ana, são 12h"
saudar("Pedro", 15); // "Pedro, são 15h"</code></pre>

    <p><strong>Rest Parameters (Parâmetros Resto):</strong></p>
    <pre><code>function somarTudo(...numeros) {
    let total = 0;
    for (let num of numeros) {
        total += num;
    }
    return total;
}

somarTudo(1, 2, 3); // 6
somarTudo(1, 2, 3, 4, 5); // 15</code></pre>

    <h3>5. Return - Retornando Valores</h3>
    <p><code>return</code> devolve um valor e <strong>encerra a execução</strong> da função:</p>

    <pre><code>function verificarIdade(idade) {
    if (idade < 18) {
        return "Menor de idade";
        // Código abaixo não executa se entrar aqui
    }

    if (idade < 60) {
        return "Adulto";
    }

    return "Idoso";
}

// Função sem return retorna undefined:
function semRetorno() {
    let x = 5;
}

console.log(semRetorno()); // undefined</code></pre>

    <h3>6. Callback - Função como Argumento</h3>
    <p>Função passada como argumento para outra função:</p>

    <pre><code>function executar(funcao) {
    console.log("Iniciando...");
    funcao(); // Executa a função recebida
    console.log("Finalizado!");
}

executar(() => console.log("Processando..."));

// Saída:
// Iniciando...
// Processando...
// Finalizado!

// Exemplo prático com arrays:
const numeros = [1, 2, 3, 4, 5];

numeros.forEach(function(num) {
    console.log(num * 2);
}); // 2, 4, 6, 8, 10</code></pre>

    <h3>7. Closure - Função que Lembra o Contexto</h3>
    <p>Closure permite que uma função acesse variáveis do escopo externo:</p>

    <pre><code>function criarContador() {
    let contador = 0; // Variável "privada"

    return function() {
        contador++;
        return contador;
    };
}

const meuContador = criarContador();
console.log(meuContador()); // 1
console.log(meuContador()); // 2
console.log(meuContador()); // 3

// Cada instância tem seu próprio contador:
const outroContador = criarContador();
console.log(outroContador()); // 1</code></pre>

    <h3>8. IIFE - Immediately Invoked Function Expression</h3>
    <p>Função executada imediatamente após ser criada:</p>

    <pre><code>(function() {
    const privado = "Não vaza para fora";
    console.log("Executei imediatamente!");
})();

// Com arrow function:
(() => {
    console.log("IIFE com arrow!");
})();

// Com parâmetros:
((nome) => {
    console.log("Olá, " + nome);
})("Maria");</code></pre>

    <h3>9. Recursão - Função que Chama a Si Mesma</h3>
    <p>Útil para problemas que podem ser divididos em subproblemas menores:</p>

    <pre><code>// Calcular fatorial: 5! = 5 × 4 × 3 × 2 × 1
function fatorial(n) {
    // Caso base (condição de parada):
    if (n <= 1) {
        return 1;
    }

    // Caso recursivo:
    return n * fatorial(n - 1);
}

fatorial(5); // 120

// Sem caso base = loop infinito! ⚠️</code></pre>

    <h3>10. Boas Práticas</h3>
    <ul>
        <li>✅ Use nomes descritivos: <code>calcularTotal()</code> em vez de <code>calc()</code></li>
        <li>✅ Funções devem fazer UMA coisa bem feita</li>
        <li>✅ Use arrow functions para callbacks curtos</li>
        <li>✅ Use function declaration para funções principais</li>
        <li>✅ Limite parâmetros (idealmente até 3)</li>
        <li>✅ Sempre retorne algo ou deixe claro que não retorna</li>
        <li>❌ Evite funções muito longas (máximo 20-30 linhas)</li>
    </ul>
`;

// RESUMO: ARRAYS
const resumoBibliotecaArrays = `
    <h3>📋 Arrays em JavaScript - Guia Completo</h3>
    <p>Arrays são <strong>listas ordenadas</strong> que armazenam múltiplos valores em uma única variável. São extremamente úteis!</p>

    <h3>1. Criando Arrays</h3>
    <pre><code>// Forma literal (recomendada):
const frutas = ["maçã", "banana", "laranja"];

// Com new Array:
const numeros = new Array(1, 2, 3);

// Array vazio:
const vazio = [];

// Array com tipos mistos (possível, mas evite):
const misto = [1, "texto", true, { nome: "João" }];</code></pre>

    <h3>2. Acessando Elementos</h3>
    <p>Arrays usam <strong>índices</strong> começando em <strong>0</strong>:</p>

    <pre><code>const cores = ["vermelho", "verde", "azul"];

console.log(cores[0]); // "vermelho" (primeiro)
console.log(cores[1]); // "verde" (segundo)
console.log(cores[2]); // "azul" (terceiro)
console.log(cores[3]); // undefined (não existe)

// Último elemento:
console.log(cores[cores.length - 1]); // "azul"

// Modificar elemento:
cores[1] = "amarelo";
console.log(cores); // ["vermelho", "amarelo", "azul"]</code></pre>

    <h3>3. Propriedades e Métodos Básicos</h3>

    <p><strong>length - Tamanho do array:</strong></p>
    <pre><code>const numeros = [10, 20, 30, 40];
console.log(numeros.length); // 4

// Esvaziar array:
numeros.length = 0;
console.log(numeros); // []</code></pre>

    <p><strong>push() - Adicionar no final:</strong></p>
    <pre><code>const frutas = ["maçã", "banana"];
frutas.push("laranja");
console.log(frutas); // ["maçã", "banana", "laranja"]

// Pode adicionar múltiplos:
frutas.push("uva", "morango");
// ["maçã", "banana", "laranja", "uva", "morango"]</code></pre>

    <p><strong>pop() - Remover do final:</strong></p>
    <pre><code>const frutas = ["maçã", "banana", "laranja"];
const removida = frutas.pop();
console.log(removida); // "laranja"
console.log(frutas); // ["maçã", "banana"]</code></pre>

    <p><strong>unshift() - Adicionar no início:</strong></p>
    <pre><code>const frutas = ["banana", "laranja"];
frutas.unshift("maçã");
console.log(frutas); // ["maçã", "banana", "laranja"]</code></pre>

    <p><strong>shift() - Remover do início:</strong></p>
    <pre><code>const frutas = ["maçã", "banana", "laranja"];
const removida = frutas.shift();
console.log(removida); // "maçã"
console.log(frutas); // ["banana", "laranja"]</code></pre>

    <h3>4. Métodos de Busca</h3>

    <p><strong>includes() - Verifica se contém:</strong></p>
    <pre><code>const frutas = ["maçã", "banana", "laranja"];
console.log(frutas.includes("banana")); // true
console.log(frutas.includes("uva")); // false</code></pre>

    <p><strong>indexOf() - Retorna índice (ou -1):</strong></p>
    <pre><code>const frutas = ["maçã", "banana", "laranja"];
console.log(frutas.indexOf("banana")); // 1
console.log(frutas.indexOf("uva")); // -1</code></pre>

    <p><strong>find() - Encontra primeiro elemento que atende condição:</strong></p>
    <pre><code>const numeros = [5, 12, 8, 130, 44];

const encontrado = numeros.find(num => num > 10);
console.log(encontrado); // 12 (primeiro > 10)

const usuarios = [
    { id: 1, nome: "Ana" },
    { id: 2, nome: "João" }
];

const usuario = usuarios.find(u => u.id === 2);
console.log(usuario); // { id: 2, nome: "João" }</code></pre>

    <h3>5. Métodos de Transformação</h3>

    <p><strong>map() - Transforma cada elemento:</strong></p>
    <pre><code>const numeros = [1, 2, 3, 4];

const dobrados = numeros.map(n => n * 2);
console.log(dobrados); // [2, 4, 6, 8]

const nomes = ["ana", "joão"];
const maiusculas = nomes.map(nome => nome.toUpperCase());
console.log(maiusculas); // ["ANA", "JOÃO"]</code></pre>

    <p><strong>filter() - Filtra elementos:</strong></p>
    <pre><code>const numeros = [1, 2, 3, 4, 5, 6];

const pares = numeros.filter(n => n % 2 === 0);
console.log(pares); // [2, 4, 6]

const maiores = numeros.filter(n => n > 3);
console.log(maiores); // [4, 5, 6]</code></pre>

    <p><strong>reduce() - Reduz a um único valor:</strong></p>
    <pre><code>const numeros = [1, 2, 3, 4, 5];

// Somar todos:
const soma = numeros.reduce((total, num) => total + num, 0);
console.log(soma); // 15

// Maior valor:
const maior = numeros.reduce((max, num) => num > max ? num : max);
console.log(maior); // 5</code></pre>

    <h3>6. Métodos de Ordenação e Reversão</h3>

    <p><strong>sort() - Ordena (MODIFICA o array):</strong></p>
    <pre><code>// ⚠️ Sem função, ordena como string:
const numeros = [10, 5, 40, 25, 1000];
numeros.sort();
console.log(numeros); // [10, 1000, 25, 40, 5] ❌

// ✅ Ordenar números corretamente:
numeros.sort((a, b) => a - b);
console.log(numeros); // [5, 10, 25, 40, 1000]

// Ordem decrescente:
numeros.sort((a, b) => b - a);
console.log(numeros); // [1000, 40, 25, 10, 5]

// Strings (funciona sem função):
const nomes = ["Carlos", "Ana", "Bruno"];
nomes.sort();
console.log(nomes); // ["Ana", "Bruno", "Carlos"]</code></pre>

    <p><strong>reverse() - Inverte ordem:</strong></p>
    <pre><code>const numeros = [1, 2, 3, 4, 5];
numeros.reverse();
console.log(numeros); // [5, 4, 3, 2, 1]</code></pre>

    <h3>7. Métodos de Extração e Cópia</h3>

    <p><strong>slice() - Copia parte (NÃO modifica original):</strong></p>
    <pre><code>const frutas = ["maçã", "banana", "laranja", "uva", "morango"];

const algumas = frutas.slice(1, 3);
console.log(algumas); // ["banana", "laranja"]
console.log(frutas); // Original intacto

// Cópia completa:
const copia = frutas.slice();

// Últimos elementos:
const ultimos = frutas.slice(-2);
console.log(ultimos); // ["uva", "morango"]</code></pre>

    <p><strong>splice() - Adiciona/remove (MODIFICA original):</strong></p>
    <pre><code>const frutas = ["maçã", "banana", "laranja", "uva"];

// Remover 2 elementos a partir do índice 1:
frutas.splice(1, 2);
console.log(frutas); // ["maçã", "uva"]

// Adicionar elementos no índice 1:
frutas.splice(1, 0, "kiwi", "manga");
console.log(frutas); // ["maçã", "kiwi", "manga", "uva"]

// Substituir elemento:
frutas.splice(2, 1, "morango");
console.log(frutas); // ["maçã", "kiwi", "morango", "uva"]</code></pre>

    <h3>8. Métodos de Iteração</h3>

    <p><strong>forEach() - Executa função para cada elemento:</strong></p>
    <pre><code>const frutas = ["maçã", "banana", "laranja"];

frutas.forEach((fruta, indice) => {
    console.log(indice + ": " + fruta);
});
// 0: maçã
// 1: banana
// 2: laranja</code></pre>

    <p><strong>every() - Testa se TODOS atendem:</strong></p>
    <pre><code>const numeros = [2, 4, 6, 8];

const todosPares = numeros.every(n => n % 2 === 0);
console.log(todosPares); // true

const todosMaiores = numeros.every(n => n > 5);
console.log(todosMaiores); // false (2 e 4 não são)</code></pre>

    <p><strong>some() - Testa se ALGUM atende:</strong></p>
    <pre><code>const numeros = [1, 3, 5, 6, 7];

const temPar = numeros.some(n => n % 2 === 0);
console.log(temPar); // true (6 é par)</code></pre>

    <h3>9. Spread e Destructuring</h3>

    <p><strong>Spread Operator (...):</strong></p>
    <pre><code>const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combinar arrays:
const combinado = [...arr1, ...arr2];
console.log(combinado); // [1, 2, 3, 4, 5, 6]

// Cópia rasa:
const copia = [...arr1];

// Passar como argumentos:
const numeros = [5, 10, 15];
console.log(Math.max(...numeros)); // 15</code></pre>

    <p><strong>Destructuring (Desestruturação):</strong></p>
    <pre><code>const cores = ["vermelho", "verde", "azul"];

// Extrair valores:
const [primeira, segunda] = cores;
console.log(primeira); // "vermelho"
console.log(segunda); // "verde"

// Pular elementos:
const [, , terceira] = cores;
console.log(terceira); // "azul"

// Rest:
const numeros = [1, 2, 3, 4, 5];
const [primeiro, segundo, ...resto] = numeros;
console.log(resto); // [3, 4, 5]</code></pre>

    <h3>10. Boas Práticas</h3>
    <ul>
        <li>✅ Use <code>map</code>, <code>filter</code>, <code>reduce</code> em vez de loops quando possível</li>
        <li>✅ Prefira métodos que não modificam o original (<code>slice</code>, <code>map</code>, etc.)</li>
        <li>✅ Use <code>const</code> para arrays (impede reatribuição, permite modificação)</li>
        <li>✅ Verifique <code>length</code> antes de acessar índices</li>
        <li>⚠️ <code>sort()</code> e <code>splice()</code> modificam o original!</li>
        <li>✅ Use <code>Array.isArray()</code> para verificar se é array</li>
    </ul>
`;

// RESUMO: OBJETOS
const resumoBibliotecaObjetos = `
    <h3>🔷 Objetos em JavaScript - Guia Completo</h3>
    <p>Objetos são <strong>coleções de pares chave-valor</strong> que representam entidades do mundo real com propriedades e comportamentos.</p>

    <h3>1. Criando Objetos</h3>

    <p><strong>Notação Literal (recomendada):</strong></p>
    <pre><code>const pessoa = {
    nome: "Ana",
    idade: 25,
    cidade: "São Paulo"
};

// Objeto vazio:
const vazio = {};</code></pre>

    <p><strong>Com new Object:</strong></p>
    <pre><code>const pessoa = new Object();
pessoa.nome = "Ana";
pessoa.idade = 25;</code></pre>

    <h3>2. Acessando Propriedades</h3>

    <p><strong>Notação de ponto (mais comum):</strong></p>
    <pre><code>const pessoa = { nome: "João", idade: 30 };

console.log(pessoa.nome); // "João"
console.log(pessoa.idade); // 30</code></pre>

    <p><strong>Notação de colchetes (dinâmica):</strong></p>
    <pre><code>const pessoa = { nome: "João", idade: 30 };

console.log(pessoa["nome"]); // "João"

// Útil para propriedades dinâmicas:
const prop = "idade";
console.log(pessoa[prop]); // 30

// Propriedades com espaços ou caracteres especiais:
const obj = {
    "primeiro nome": "Ana",
    "e-mail": "ana@email.com"
};

console.log(obj["primeiro nome"]); // "Ana"
console.log(obj["e-mail"]); // "ana@email.com"</code></pre>

    <h3>3. Adicionando, Modificando e Removendo</h3>

    <pre><code>const pessoa = { nome: "Ana" };

// Adicionar propriedade:
pessoa.idade = 25;
pessoa.cidade = "Rio";

// Modificar propriedade:
pessoa.nome = "Ana Silva";

// Remover propriedade:
delete pessoa.cidade;

console.log(pessoa);
// { nome: "Ana Silva", idade: 25 }</code></pre>

    <h3>4. Métodos - Funções em Objetos</h3>

    <p><strong>Métodos são funções como propriedades:</strong></p>
    <pre><code>const pessoa = {
    nome: "João",
    idade: 30,

    // Método tradicional:
    saudar: function() {
        return "Olá, meu nome é " + this.nome;
    },

    // Sintaxe curta (ES6):
    apresentar() {
        return "Tenho " + this.idade + " anos";
    }
};

console.log(pessoa.saudar()); // "Olá, meu nome é João"
console.log(pessoa.apresentar()); // "Tenho 30 anos"</code></pre>

    <h3>5. this - Referência ao Próprio Objeto</h3>

    <p><code>this</code> dentro de um método aponta para o objeto:</p>
    <pre><code>const calculadora = {
    valor: 0,

    somar(n) {
        this.valor += n;
        return this; // Retorna o objeto para encadear
    },

    subtrair(n) {
        this.valor -= n;
        return this;
    },

    resultado() {
        return this.valor;
    }
};

// Encadeamento de métodos:
calculadora.somar(10).somar(5).subtrair(3);
console.log(calculadora.resultado()); // 12</code></pre>

    <p><strong>⚠️ Cuidado com arrow functions:</strong></p>
    <pre><code>const pessoa = {
    nome: "Ana",

    // ❌ Arrow function não tem próprio 'this':
    saudar: () => {
        console.log("Olá, " + this.nome); // undefined!
    },

    // ✅ Função normal:
    apresentar: function() {
        console.log("Olá, " + this.nome); // "Ana"
    }
};</code></pre>

    <h3>6. Verificando Propriedades</h3>

    <p><strong>Operador 'in':</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 25 };

console.log("nome" in pessoa); // true
console.log("cidade" in pessoa); // false</code></pre>

    <p><strong>hasOwnProperty():</strong></p>
    <pre><code>const pessoa = { nome: "Ana" };

console.log(pessoa.hasOwnProperty("nome")); // true
console.log(pessoa.hasOwnProperty("idade")); // false</code></pre>

    <h3>7. Iterando sobre Objetos</h3>

    <p><strong>Object.keys() - Array de chaves:</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 25, cidade: "SP" };

const chaves = Object.keys(pessoa);
console.log(chaves); // ["nome", "idade", "cidade"]

// Iterar:
chaves.forEach(chave => {
    console.log(chave + ": " + pessoa[chave]);
});
// nome: Ana
// idade: 25
// cidade: SP</code></pre>

    <p><strong>Object.values() - Array de valores:</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 25 };

const valores = Object.values(pessoa);
console.log(valores); // ["Ana", 25]</code></pre>

    <p><strong>Object.entries() - Array de pares [chave, valor]:</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 25 };

const entradas = Object.entries(pessoa);
console.log(entradas);
// [["nome", "Ana"], ["idade", 25]]

// Com destructuring:
for (const [chave, valor] of Object.entries(pessoa)) {
    console.log(\`\${chave}: \${valor}\`);
}
// nome: Ana
// idade: 25</code></pre>

    <p><strong>for...in - Itera sobre chaves:</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 25 };

for (const chave in pessoa) {
    console.log(chave + ": " + pessoa[chave]);
}
// nome: Ana
// idade: 25</code></pre>

    <h3>8. Copiando e Mesclando Objetos</h3>

    <p><strong>Spread Operator (cópia rasa):</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 25 };

// Cópia:
const copia = { ...pessoa };

// Mesclar:
const endereco = { cidade: "SP", estado: "SP" };
const completo = { ...pessoa, ...endereco };
console.log(completo);
// { nome: "Ana", idade: 25, cidade: "SP", estado: "SP" }

// Sobrescrever propriedades:
const atualizado = { ...pessoa, idade: 26 };
console.log(atualizado); // { nome: "Ana", idade: 26 }</code></pre>

    <p><strong>Object.assign() (cópia rasa):</strong></p>
    <pre><code>const pessoa = { nome: "Ana" };
const detalhes = { idade: 25, cidade: "SP" };

const completo = Object.assign({}, pessoa, detalhes);
console.log(completo);
// { nome: "Ana", idade: 25, cidade: "SP" }</code></pre>

    <p><strong>⚠️ Cópia rasa vs profunda:</strong></p>
    <pre><code>const pessoa = {
    nome: "Ana",
    endereco: { cidade: "SP" }
};

const copia = { ...pessoa };

// Modifica no original também! (referência compartilhada)
copia.endereco.cidade = "RJ";
console.log(pessoa.endereco.cidade); // "RJ" ⚠️

// Para cópia profunda, use:
const copiaProf = JSON.parse(JSON.stringify(pessoa));</code></pre>

    <h3>9. Destructuring (Desestruturação)</h3>

    <p><strong>Extrair propriedades:</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 25, cidade: "SP" };

// Desestruturação:
const { nome, idade } = pessoa;
console.log(nome); // "Ana"
console.log(idade); // 25

// Renomear:
const { nome: nomePessoa, idade: anos } = pessoa;
console.log(nomePessoa); // "Ana"
console.log(anos); // 25

// Valor padrão:
const { profissao = "Não informada" } = pessoa;
console.log(profissao); // "Não informada"

// Rest:
const { nome, ...resto } = pessoa;
console.log(resto); // { idade: 25, cidade: "SP" }</code></pre>

    <h3>10. Métodos Avançados</h3>

    <p><strong>Object.freeze() - Torna imutável:</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 25 };

Object.freeze(pessoa);

pessoa.idade = 30; // Ignorado (erro em strict mode)
pessoa.cidade = "RJ"; // Ignorado
delete pessoa.nome; // Ignorado

console.log(pessoa); // { nome: "Ana", idade: 25 }</code></pre>

    <p><strong>Object.seal() - Permite modificar, não adicionar/remover:</strong></p>
    <pre><code>const pessoa = { nome: "Ana", idade: 25 };

Object.seal(pessoa);

pessoa.idade = 30; // ✅ Funciona
pessoa.cidade = "RJ"; // ❌ Ignorado
delete pessoa.nome; // ❌ Ignorado

console.log(pessoa); // { nome: "Ana", idade: 30 }</code></pre>

    <h3>11. Shorthand Properties e Computed Property Names</h3>

    <p><strong>Shorthand (propriedade abreviada):</strong></p>
    <pre><code>const nome = "Ana";
const idade = 25;

// Antes:
const pessoa = { nome: nome, idade: idade };

// Agora (ES6):
const pessoa = { nome, idade };
console.log(pessoa); // { nome: "Ana", idade: 25 }</code></pre>

    <p><strong>Computed Property Names:</strong></p>
    <pre><code>const propriedade = "nome";
const valor = "Ana";

const pessoa = {
    [propriedade]: valor,
    ["idade"]: 25,
    ["profissao_" + "atual"]: "Dev"
};

console.log(pessoa);
// { nome: "Ana", idade: 25, profissao_atual: "Dev" }</code></pre>

    <h3>12. Boas Práticas</h3>
    <ul>
        <li>✅ Use notação literal <code>{ }</code> para criar objetos</li>
        <li>✅ Use <code>const</code> para objetos (impede reatribuição)</li>
        <li>✅ Prefira métodos curtos (ES6) em vez de <code>function</code></li>
        <li>✅ Use destructuring para extrair múltiplas propriedades</li>
        <li>✅ Use spread para copiar/mesclar objetos</li>
        <li>❌ Evite arrow functions para métodos (problema com <code>this</code>)</li>
        <li>✅ Use nomes descritivos para propriedades</li>
    </ul>
`;

// RESUMO: OPERADORES
const resumoBibliotecaOperadores = `
    <h3>➕ Operadores em JavaScript - Guia Completo</h3>
    <p>Operadores são <strong>símbolos especiais</strong> que realizam operações em valores (operandos). JavaScript tem vários tipos de operadores!</p>

    <h3>1. Operadores Aritméticos</h3>
    <p>Realizam cálculos matemáticos:</p>

    <pre><code>// Adição (+)
let soma = 5 + 3; // 8
let texto = "Olá" + " " + "Mundo"; // "Olá Mundo" (concatenação)

// Subtração (-)
let diferenca = 10 - 4; // 6

// Multiplicação (*)
let produto = 6 * 7; // 42

// Divisão (/)
let quociente = 15 / 3; // 5
let decimal = 10 / 4; // 2.5

// Módulo (%) - Resto da divisão
let resto = 10 % 3; // 1
let parOuImpar = 7 % 2; // 1 (ímpar)

// Exponenciação (**)
let potencia = 2 ** 3; // 8 (2 elevado a 3)
let quadrado = 5 ** 2; // 25</code></pre>

    <p><strong>⚠️ Ordem de precedência (igual à matemática):</strong></p>
    <pre><code>let resultado = 2 + 3 * 4; // 14 (não 20!)
// Multiplicação primeiro: 3 * 4 = 12
// Depois soma: 2 + 12 = 14

// Use parênteses para controlar:
let resultado2 = (2 + 3) * 4; // 20</code></pre>

    <h3>2. Operadores de Atribuição</h3>
    <p>Atribuem valores a variáveis:</p>

    <pre><code>// Atribuição simples (=)
let x = 10;

// Atribuição com adição (+=)
x += 5; // Equivale a: x = x + 5
console.log(x); // 15

// Atribuição com subtração (-=)
x -= 3; // Equivale a: x = x - 3
console.log(x); // 12

// Atribuição com multiplicação (*=)
x *= 2; // Equivale a: x = x * 2
console.log(x); // 24

// Atribuição com divisão (/=)
x /= 4; // Equivale a: x = x / 4
console.log(x); // 6

// Atribuição com módulo (%=)
x %= 4; // Equivale a: x = x % 4
console.log(x); // 2

// Atribuição com exponenciação (**=)
x **= 3; // Equivale a: x = x ** 3
console.log(x); // 8</code></pre>

    <h3>3. Operadores de Incremento e Decremento</h3>
    <p>Aumentam ou diminuem em 1:</p>

    <pre><code>let contador = 5;

// Pós-incremento (++)
console.log(contador++); // 5 (usa depois incrementa)
console.log(contador); // 6

// Pré-incremento (++)
contador = 5;
console.log(++contador); // 6 (incrementa antes de usar)
console.log(contador); // 6

// Pós-decremento (--)
contador = 5;
console.log(contador--); // 5 (usa depois decrementa)
console.log(contador); // 4

// Pré-decremento (--)
contador = 5;
console.log(--contador); // 4 (decrementa antes de usar)
console.log(contador); // 4</code></pre>

    <h3>4. Operadores de Comparação</h3>
    <p>Comparam valores e retornam <code>true</code> ou <code>false</code>:</p>

    <pre><code>// Igualdade (==) - Compara VALOR (converte tipos)
console.log(5 == 5); // true
console.log(5 == "5"); // true (converte string para número!)
console.log(true == 1); // true
console.log(false == 0); // true

// Igualdade estrita (===) - Compara VALOR E TIPO
console.log(5 === 5); // true
console.log(5 === "5"); // false (tipos diferentes!)
console.log(true === 1); // false

// Desigualdade (!=)
console.log(5 != 3); // true
console.log(5 != "5"); // false (converte!)

// Desigualdade estrita (!==)
console.log(5 !== "5"); // true (tipos diferentes)

// Maior que (>)
console.log(10 > 5); // true
console.log(5 > 10); // false

// Menor que (<)
console.log(5 < 10); // true

// Maior ou igual (>=)
console.log(10 >= 10); // true
console.log(10 >= 5); // true

// Menor ou igual (<=)
console.log(5 <= 10); // true</code></pre>

    <p><strong>✅ Boa prática: Use sempre === e !== para evitar bugs!</strong></p>

    <h3>5. Operadores Lógicos</h3>
    <p>Combinam expressões booleanas:</p>

    <p><strong>AND lógico (&&) - Retorna true se TODOS forem true:</strong></p>
    <pre><code>console.log(true && true); // true
console.log(true && false); // false
console.log(false && false); // false

// Exemplo prático:
let idade = 20;
let temCarteira = true;

if (idade >= 18 && temCarteira) {
    console.log("Pode dirigir!");
}

// Short-circuit: Para na primeira false
console.log(false && console.log("Não executa")); // false
console.log(true && console.log("Executa")); // Executa e retorna undefined</code></pre>

    <p><strong>OR lógico (||) - Retorna true se PELO MENOS UM for true:</strong></p>
    <pre><code>console.log(true || false); // true
console.log(false || true); // true
console.log(false || false); // false

// Exemplo prático:
let ehFimDeSemana = true;
let ehFeriado = false;

if (ehFimDeSemana || ehFeriado) {
    console.log("Pode descansar!");
}

// Short-circuit: Para no primeiro true
console.log(true || console.log("Não executa")); // true
console.log(false || console.log("Executa")); // Executa

// Valor padrão:
let nome = "";
let nomeExibir = nome || "Visitante";
console.log(nomeExibir); // "Visitante"</code></pre>

    <p><strong>NOT lógico (!) - Inverte o valor booleano:</strong></p>
    <pre><code>console.log(!true); // false
console.log(!false); // true

let estaChovendo = false;
if (!estaChovendo) {
    console.log("Pode sair!");
}

// Dupla negação (!!) - Converte para booleano
console.log(!!"texto"); // true
console.log(!!0); // false
console.log(!!""); // false
console.log(!!null); // false
console.log(!!undefined); // false</code></pre>

    <h3>6. Operador Ternário (Condicional)</h3>
    <p>If/else em uma linha única:</p>

    <pre><code>// Sintaxe: condição ? valorSeTrue : valorSeFalse

let idade = 20;
let status = idade >= 18 ? "Maior de idade" : "Menor de idade";
console.log(status); // "Maior de idade"

// Múltiplos ternários (evite, fica confuso):
let nota = 85;
let conceito = nota >= 90 ? "A" :
               nota >= 80 ? "B" :
               nota >= 70 ? "C" : "D";
console.log(conceito); // "B"

// Exemplo prático:
const usuarios = [1, 2, 3];
console.log(usuarios.length > 0 ? "Tem usuários" : "Lista vazia");</code></pre>

    <h3>7. Operadores de String</h3>

    <pre><code>// Concatenação (+)
let nome = "João";
let sobrenome = "Silva";
let nomeCompleto = nome + " " + sobrenome;
console.log(nomeCompleto); // "João Silva"

// Template Literals (\`) - Forma moderna
let idade = 25;
let mensagem = \`Meu nome é \${nome} e tenho \${idade} anos\`;
console.log(mensagem); // "Meu nome é João e tenho 25 anos"

// Conversão automática
console.log("Número: " + 42); // "Número: 42"
console.log("Resultado: " + (5 + 3)); // "Resultado: 8"</code></pre>

    <h3>8. Operador typeof</h3>
    <p>Retorna o tipo do valor:</p>

    <pre><code>console.log(typeof 42); // "number"
console.log(typeof "texto"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (bug histórico!)
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof function(){}); // "function"

// Verificar tipo:
let valor = 42;
if (typeof valor === "number") {
    console.log("É um número!");
}</code></pre>

    <h3>9. Operador Nullish Coalescing (??)</h3>
    <p>Retorna o valor da direita se o da esquerda for <code>null</code> ou <code>undefined</code>:</p>

    <pre><code>let nome = null;
let nomePadrao = nome ?? "Visitante";
console.log(nomePadrao); // "Visitante"

// Diferença do ||:
let valor = 0;
console.log(valor || 10); // 10 (0 é falsy)
console.log(valor ?? 10); // 0 (0 não é null/undefined)

let texto = "";
console.log(texto || "padrão"); // "padrão" ("" é falsy)
console.log(texto ?? "padrão"); // "" ("" não é null/undefined)</code></pre>

    <h3>10. Operador Optional Chaining (?.)</h3>
    <p>Acessa propriedades aninhadas com segurança:</p>

    <pre><code>const usuario = {
    nome: "Ana",
    endereco: {
        cidade: "São Paulo"
    }
};

// Sem optional chaining:
console.log(usuario.endereco.cidade); // "São Paulo"
// console.log(usuario.contato.telefone); // ERRO!

// Com optional chaining:
console.log(usuario.contato?.telefone); // undefined (não dá erro!)
console.log(usuario.endereco?.cidade); // "São Paulo"

// Com arrays:
const lista = null;
console.log(lista?.[0]); // undefined

// Com funções:
const obj = {};
obj.metodo?.(); // Não dá erro se método não existir</code></pre>

    <h3>11. Operador Spread (...)</h3>

    <pre><code>// Espalhar elementos de array:
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinado = [...arr1, ...arr2];
console.log(combinado); // [1, 2, 3, 4, 5, 6]

// Espalhar propriedades de objeto:
const pessoa = { nome: "Ana", idade: 25 };
const copia = { ...pessoa };
const atualizado = { ...pessoa, idade: 26 };

// Passar como argumentos:
const numeros = [5, 10, 15];
console.log(Math.max(...numeros)); // 15</code></pre>

    <h3>12. Precedência de Operadores</h3>
    <p>Ordem de execução (do maior para o menor):</p>

    <ol>
        <li>Parênteses <code>()</code></li>
        <li>Incremento/Decremento <code>++</code>, <code>--</code></li>
        <li>NOT <code>!</code></li>
        <li>Exponenciação <code>**</code></li>
        <li>Multiplicação, Divisão, Módulo <code>*</code>, <code>/</code>, <code>%</code></li>
        <li>Adição, Subtração <code>+</code>, <code>-</code></li>
        <li>Comparação <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></li>
        <li>Igualdade <code>==</code>, <code>===</code>, <code>!=</code>, <code>!==</code></li>
        <li>AND <code>&&</code></li>
        <li>OR <code>||</code></li>
        <li>Ternário <code>? :</code></li>
        <li>Atribuição <code>=</code>, <code>+=</code>, etc.</li>
    </ol>

    <pre><code>// Exemplos:
let x = 2 + 3 * 4; // 14 (não 20)
let y = (2 + 3) * 4; // 20
let z = 10 > 5 && 3 < 7; // true && true = true</code></pre>

    <h3>13. Boas Práticas</h3>
    <ul>
        <li>✅ Use <code>===</code> e <code>!==</code> em vez de <code>==</code> e <code>!=</code></li>
        <li>✅ Use parênteses para deixar expressões claras</li>
        <li>✅ Prefira template literals para concatenar strings</li>
        <li>✅ Use <code>??</code> para valores padrão em vez de <code>||</code></li>
        <li>✅ Use <code>?.</code> para acessar propriedades que podem não existir</li>
        <li>❌ Evite ternários aninhados (use if/else)</li>
        <li>✅ Entenda a precedência dos operadores</li>
    </ul>
`;

// RESUMO: CONDICIONAIS
const resumoBibliotecaCondicionais = `
    <h3>🔀 Condicionais em JavaScript - Guia Completo</h3>
    <p>Condicionais permitem que seu código <strong>tome decisões</strong> e execute blocos diferentes baseado em condições.</p>

    <h3>1. if - A Condicional Básica</h3>
    <p>Executa código SE a condição for verdadeira:</p>

    <pre><code>// Sintaxe básica:
if (condição) {
    // Código executado se condição for true
}

// Exemplo:
let idade = 20;

if (idade >= 18) {
    console.log("Você é maior de idade!");
}

// Com uma linha, pode omitir chaves (não recomendado):
if (idade >= 18) console.log("Maior de idade");

// Múltiplas condições:
let temCarteira = true;

if (idade >= 18 && temCarteira) {
    console.log("Pode dirigir!");
}</code></pre>

    <h3>2. if...else - Duas Opções</h3>
    <p>Executa um bloco se true, outro se false:</p>

    <pre><code>let idade = 16;

if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// Exemplo prático:
let temperatura = 25;

if (temperatura > 30) {
    console.log("Está quente!");
} else {
    console.log("Está agradável!");
}</code></pre>

    <h3>3. else if - Múltiplas Condições</h3>
    <p>Testa várias condições em sequência:</p>

    <pre><code>let nota = 85;

if (nota >= 90) {
    console.log("Conceito A");
} else if (nota >= 80) {
    console.log("Conceito B");
} else if (nota >= 70) {
    console.log("Conceito C");
} else if (nota >= 60) {
    console.log("Conceito D");
} else {
    console.log("Reprovado");
}

// Exemplo com múltiplas condições:
let hora = 14;

if (hora < 12) {
    console.log("Bom dia!");
} else if (hora < 18) {
    console.log("Boa tarde!");
} else {
    console.log("Boa noite!");
}</code></pre>

    <p><strong>⚠️ Importante:</strong> Apenas o PRIMEIRO bloco true é executado!</p>

    <pre><code>let numero = 15;

if (numero > 10) {
    console.log("Maior que 10"); // ✅ Executa
} else if (numero > 5) {
    console.log("Maior que 5"); // Não executa (já entrou no primeiro)
}

// Para executar múltiplos, use ifs separados:
if (numero > 10) {
    console.log("Maior que 10"); // ✅ Executa
}
if (numero > 5) {
    console.log("Maior que 5"); // ✅ Executa
}</code></pre>

    <h3>4. Operador Ternário - if/else Resumido</h3>
    <p>Condicional em uma linha única:</p>

    <pre><code>// Sintaxe: condição ? valorSeTrue : valorSeFalse

let idade = 20;
let status = idade >= 18 ? "Adulto" : "Jovem";
console.log(status); // "Adulto"

// Exemplo em atribuição:
let desconto = temCupom ? 0.1 : 0;

// Em retorno de função:
function obterSaudacao(hora) {
    return hora < 12 ? "Bom dia" : "Boa tarde";
}

// Ternário aninhado (evite, fica confuso):
let nota = 85;
let conceito = nota >= 90 ? "A" :
               nota >= 80 ? "B" :
               nota >= 70 ? "C" : "D";

// ✅ Melhor usar if/else para isso!</code></pre>

    <h3>5. switch - Múltiplas Opções Fixas</h3>
    <p>Compara um valor com vários casos específicos:</p>

    <pre><code>let diaSemana = 3;
let nomeDia;

switch (diaSemana) {
    case 1:
        nomeDia = "Segunda";
        break;
    case 2:
        nomeDia = "Terça";
        break;
    case 3:
        nomeDia = "Quarta";
        break;
    case 4:
        nomeDia = "Quinta";
        break;
    case 5:
        nomeDia = "Sexta";
        break;
    case 6:
        nomeDia = "Sábado";
        break;
    case 7:
        nomeDia = "Domingo";
        break;
    default:
        nomeDia = "Dia inválido";
}

console.log(nomeDia); // "Quarta"</code></pre>

    <p><strong>⚠️ IMPORTANTE: Use break!</strong></p>
    <pre><code>// Sem break, executa os casos seguintes:
let opcao = 1;

switch (opcao) {
    case 1:
        console.log("Um");
        // ❌ SEM BREAK!
    case 2:
        console.log("Dois");
        break;
}
// Saída:
// Um
// Dois

// Com break correto:
switch (opcao) {
    case 1:
        console.log("Um");
        break; // ✅ Para aqui
    case 2:
        console.log("Dois");
        break;
}
// Saída:
// Um</code></pre>

    <p><strong>Múltiplos casos com mesmo código:</strong></p>
    <pre><code>let dia = "sábado";

switch (dia) {
    case "sábado":
    case "domingo":
        console.log("É fim de semana!");
        break;
    case "segunda":
    case "terça":
    case "quarta":
    case "quinta":
    case "sexta":
        console.log("É dia de semana");
        break;
    default:
        console.log("Dia inválido");
}</code></pre>

    <p><strong>default - Caso padrão:</strong></p>
    <pre><code>let cor = "amarelo";

switch (cor) {
    case "vermelho":
        console.log("Pare!");
        break;
    case "amarelo":
        console.log("Atenção!");
        break;
    case "verde":
        console.log("Siga!");
        break;
    default:
        console.log("Cor inválida");
}</code></pre>

    <h3>6. Valores Truthy e Falsy</h3>
    <p>Nem tudo é true ou false, mas pode ser <strong>convertido</strong>:</p>

    <p><strong>Valores Falsy (convertidos para false):</strong></p>
    <ul>
        <li><code>false</code></li>
        <li><code>0</code></li>
        <li><code>""</code> (string vazia)</li>
        <li><code>null</code></li>
        <li><code>undefined</code></li>
        <li><code>NaN</code></li>
    </ul>

    <pre><code>// Todos são falsy:
if (0) { } // NÃO executa
if ("") { } // NÃO executa
if (null) { } // NÃO executa
if (undefined) { } // NÃO executa
if (NaN) { } // NÃO executa
if (false) { } // NÃO executa</code></pre>

    <p><strong>Valores Truthy (convertidos para true):</strong></p>
    <ul>
        <li>Todos os outros valores!</li>
        <li>Strings não vazias: <code>"0"</code>, <code>"false"</code></li>
        <li>Números diferentes de 0: <code>1</code>, <code>-1</code>, <code>3.14</code></li>
        <li>Arrays vazios: <code>[]</code></li>
        <li>Objetos vazios: <code>{}</code></li>
    </ul>

    <pre><code>// Todos são truthy:
if (1) { } // ✅ Executa
if ("texto") { } // ✅ Executa
if ("0") { } // ✅ Executa (string não vazia!)
if ([]) { } // ✅ Executa
if ({}) { } // ✅ Executa
if (true) { } // ✅ Executa</code></pre>

    <p><strong>Uso prático:</strong></p>
    <pre><code>let nome = "";

if (nome) {
    console.log("Olá, " + nome);
} else {
    console.log("Nome não informado");
}

// Verificar existência:
let usuario = null;

if (usuario) {
    console.log(usuario.nome);
} else {
    console.log("Usuário não encontrado");
}</code></pre>

    <h3>7. Short-Circuit Evaluation</h3>
    <p>AND (&&) e OR (||) podem retornar valores, não apenas true/false:</p>

    <p><strong>AND (&&) - Retorna primeiro falsy OU último valor:</strong></p>
    <pre><code>console.log(true && "texto"); // "texto"
console.log(false && "texto"); // false
console.log("a" && "b" && "c"); // "c" (último)
console.log("a" && false && "c"); // false (primeiro falsy)

// Uso prático (executar se existir):
let usuario = { nome: "Ana" };
usuario && console.log(usuario.nome); // "Ana"

usuario = null;
usuario && console.log(usuario.nome); // Não executa (retorna null)</code></pre>

    <p><strong>OR (||) - Retorna primeiro truthy OU último valor:</strong></p>
    <pre><code>console.log(false || "texto"); // "texto"
console.log(true || "texto"); // true
console.log("a" || "b" || "c"); // "a" (primeiro)
console.log(false || null || "c"); // "c" (primeiro truthy)

// Valor padrão:
let nome = "";
let nomeExibir = nome || "Visitante";
console.log(nomeExibir); // "Visitante"

let numero = 0;
let valorPadrao = numero || 10;
console.log(valorPadrao); // 10</code></pre>

    <h3>8. Condicionais Aninhadas</h3>
    <p>if dentro de if (use com moderação!):</p>

    <pre><code>let idade = 25;
let temCarteira = true;

if (idade >= 18) {
    if (temCarteira) {
        console.log("Pode dirigir!");
    } else {
        console.log("Precisa tirar carteira");
    }
} else {
    console.log("Menor de idade");
}

// ✅ Melhor: Combine condições
if (idade >= 18 && temCarteira) {
    console.log("Pode dirigir!");
} else if (idade >= 18) {
    console.log("Precisa tirar carteira");
} else {
    console.log("Menor de idade");
}</code></pre>

    <h3>9. Guard Clauses (Cláusulas de Guarda)</h3>
    <p>Retorne cedo para evitar aninhamento:</p>

    <pre><code>// ❌ Ruim (muito aninhamento):
function processar(usuario) {
    if (usuario) {
        if (usuario.idade >= 18) {
            if (usuario.ativo) {
                console.log("Processando...");
            } else {
                console.log("Usuário inativo");
            }
        } else {
            console.log("Menor de idade");
        }
    } else {
        console.log("Usuário não informado");
    }
}

// ✅ Bom (guard clauses):
function processar(usuario) {
    if (!usuario) {
        console.log("Usuário não informado");
        return;
    }

    if (usuario.idade < 18) {
        console.log("Menor de idade");
        return;
    }

    if (!usuario.ativo) {
        console.log("Usuário inativo");
        return;
    }

    console.log("Processando...");
}</code></pre>

    <h3>10. Boas Práticas</h3>
    <ul>
        <li>✅ Use <code>===</code> em vez de <code>==</code> nas condições</li>
        <li>✅ Sempre use chaves <code>{ }</code> mesmo com uma linha</li>
        <li>✅ Use guard clauses para reduzir aninhamento</li>
        <li>✅ Prefira <code>switch</code> quando tem muitos casos fixos</li>
        <li>✅ Use ternário apenas para casos simples</li>
        <li>❌ Evite ternários aninhados</li>
        <li>✅ Agrupe condições relacionadas com <code>&&</code> e <code>||</code></li>
        <li>✅ Entenda truthy e falsy para código mais conciso</li>
        <li>❌ Evite muitos níveis de aninhamento (máximo 2-3)</li>
    </ul>

    <h3>11. Padrões Comuns</h3>

    <p><strong>Validação de formulário:</strong></p>
    <pre><code>function validarFormulario(email, senha) {
    if (!email) {
        return "Email obrigatório";
    }

    if (!email.includes("@")) {
        return "Email inválido";
    }

    if (!senha) {
        return "Senha obrigatória";
    }

    if (senha.length < 6) {
        return "Senha muito curta";
    }

    return "Válido";
}</code></pre>

    <p><strong>Verificar tipo:</strong></p>
    <pre><code>function processar(valor) {
    if (typeof valor === "string") {
        console.log(valor.toUpperCase());
    } else if (typeof valor === "number") {
        console.log(valor * 2);
    } else if (Array.isArray(valor)) {
        console.log(valor.length);
    } else {
        console.log("Tipo não suportado");
    }
}</code></pre>

    <p><strong>Verificar existência em objeto:</strong></p>
    <pre><code>const usuario = {
    nome: "Ana",
    idade: 25
};

if ("nome" in usuario) {
    console.log(usuario.nome);
}

if (usuario.hasOwnProperty("idade")) {
    console.log(usuario.idade);
}</code></pre>
`;

// Objeto que mapeia cada tema da biblioteca ao seu resumo
const resumosBiblioteca = {
    variaveis: resumoBibliotecaVariaveis,
    funcoes: resumoBibliotecaFuncoes,
    arrays: resumoBibliotecaArrays,
    objetos: resumoBibliotecaObjetos,
    operadores: resumoBibliotecaOperadores,
    condicionais: resumoBibliotecaCondicionais
};

// ========================================
// SELEÇÃO DE ELEMENTOS DO HTML
// ========================================

const telaInicial = document.querySelector("#tela-inicial");
const telaModos = document.querySelector("#tela-modos");
const telaBiblioteca = document.querySelector("#tela-biblioteca");
const telaQuiz = document.querySelector("#tela-quiz");
const telaResultado = document.querySelector("#tela-resultado");
const telaResumo = document.querySelector("#tela-resumo");

const btnIniciar = document.querySelector("#btn-iniciar");
const btnProxima = document.querySelector("#btn-proxima");
const btnReiniciar = document.querySelector("#btn-reiniciar");
const btnVoltarInicio = document.querySelector("#btn-voltar-inicio");
const btnVoltarModos = document.querySelector("#btn-voltar-modos");

// Botão de sair do quiz
const btnSairQuiz = document.querySelector("#btn-sair-quiz");

// Elementos da tela de resumo
const tituloResumo = document.querySelector("#titulo-resumo");
const conteudoResumo = document.querySelector("#conteudo-resumo");
const btnResumoParaPerguntas = document.querySelector("#btn-resumo-para-perguntas");
const btnVoltarResumo = document.querySelector("#btn-voltar-resumo");

// Seleciona todos os botões de resumo e quiz dos níveis
const botoesResumo = document.querySelectorAll(".btn-resumo");
const botoesQuiz = document.querySelectorAll(".btn-quiz");

// Seleciona todos os botões de resumo e quiz da biblioteca
const botoesResumoTema = document.querySelectorAll(".btn-resumo-tema");
const botoesQuizTema = document.querySelectorAll(".btn-quiz-tema");

// Seleciona o botão da biblioteca (mantém a funcionalidade antiga)
const botoesModosJogo = document.querySelectorAll(".btn-modo");

const textoPergunta = document.querySelector("#texto-pergunta");
const opcoesResposta = document.querySelector("#opcoes-resposta");
const feedbackDiv = document.querySelector("#feedback");
const textoFeedback = document.querySelector("#texto-feedback");

const numeroQuestao = document.querySelector("#numero-questao");
const pontuacaoSpan = document.querySelector("#pontuacao");
const barraProgresso = document.querySelector("#barra-progresso");
const modoAtualSpan = document.querySelector("#modo-atual");

const pontuacaoFinal = document.querySelector("#pontuacao-final");
const mensagemFinal = document.querySelector("#mensagem-final");

// ========================================
// EVENT LISTENERS (Ouvintes de Eventos)
// ========================================

// Botão de iniciar - leva para tela de seleção de modo
btnIniciar.addEventListener("click", mostrarTelaModos);

// Botão voltar - volta para tela inicial
btnVoltarInicio.addEventListener("click", voltarTelaInicial);

// Adiciona evento de clique em cada botão de RESUMO
// Quando clicar no botão "Resumo", mostra a tela de resumo do tema
botoesResumo.forEach((botao) => {
    botao.addEventListener("click", () => {
        // Pega o modo do atributo data-modo do botão
        const modo = botao.getAttribute("data-modo");
        // Armazena temporariamente para usar depois
        modoTemporario = modo;
        // Mostra a tela de resumo
        mostrarResumo(modo);
    });
});

// Adiciona evento de clique em cada botão de QUIZ
// Quando clicar no botão "Quiz", inicia o jogo diretamente
botoesQuiz.forEach((botao) => {
    botao.addEventListener("click", () => {
        // Pega o modo do atributo data-modo do botão
        const modo = botao.getAttribute("data-modo");
        // Inicia o jogo com esse modo
        iniciarJogo(modo);
    });
});

// Event listener do botão da biblioteca (mantém funcionalidade antiga)
botoesModosJogo.forEach((botao) => {
    botao.addEventListener("click", (evento) => {
        // Pega o card pai do botão clicado
        const card = evento.target.closest(".card-modo");
        // Pega o modo do atributo data-modo
        const modo = card.getAttribute("data-modo");

        // Verifica se clicou na biblioteca
        if (modo === "biblioteca") {
            mostrarBiblioteca();
        }
    });
});

// Adiciona evento de clique em cada botão de RESUMO da biblioteca
botoesResumoTema.forEach((botao) => {
    botao.addEventListener("click", () => {
        // Pega o tema do atributo data-tema do botão
        const tema = botao.getAttribute("data-tema");
        // Armazena temporariamente para usar depois
        modoTemporario = tema;
        // Mostra a tela de resumo do tema da biblioteca
        mostrarResumoTema(tema);
    });
});

// Adiciona evento de clique em cada botão de QUIZ da biblioteca
botoesQuizTema.forEach((botao) => {
    botao.addEventListener("click", () => {
        // Pega o tema do atributo data-tema do botão
        const tema = botao.getAttribute("data-tema");
        // Inicia o quiz do tema diretamente
        iniciarQuizTema(tema);
    });
});

// Event listeners da tela de resumo
btnResumoParaPerguntas.addEventListener("click", () => {
    // Verifica se é um tema da biblioteca ou um modo
    // Se modoTemporario está em resumosBiblioteca, é da biblioteca
    if (resumosBiblioteca[modoTemporario]) {
        iniciarQuizTema(modoTemporario);
    } else {
        // Senão, é um modo (iniciante, intermediário, etc.)
        iniciarJogo(modoTemporario);
    }
});
btnVoltarResumo.addEventListener("click", voltarDoResumoParaModos);

// Botão voltar da biblioteca para modos
btnVoltarModos.addEventListener("click", voltarParaModos);

// Botão de sair do quiz (X no canto superior direito)
// Permite que o usuário saia do quiz sem terminar
// Verifica se o botão existe antes de adicionar o evento
if (btnSairQuiz) {
    btnSairQuiz.addEventListener("click", sairDoQuiz);
}

btnProxima.addEventListener("click", proximaPergunta);
btnReiniciar.addEventListener("click", reiniciarJogo);

// ========================================
// FUNÇÕES DO JOGO
// ========================================

// Mostra a tela de seleção de modos
function mostrarTelaModos() {
    telaInicial.classList.remove("ativa");
    telaModos.classList.add("ativa");
}

// Volta para a tela inicial
function voltarTelaInicial() {
    telaModos.classList.remove("ativa");
    telaInicial.classList.add("ativa");
}

// ========================================
// FUNÇÕES DE RESUMO
// ========================================

// Mostra a tela de resumo do tema/modo selecionado
function mostrarResumo(modo) {
    // Pega o resumo correspondente ao modo
    const resumoHTML = resumosPorModo[modo];

    // Define o título baseado no modo
    const titulos = {
        iniciante: "Resumo - Nível Iniciante 🌱",
        intermediario: "Resumo - Nível Intermediário 🔥",
        avancado: "Resumo - Nível Avançado ⚡",
        desafio: "Resumo - Modo Desafio 🏆"
    };

    // Atualiza o título da tela
    tituloResumo.textContent = titulos[modo] || "Resumo do Tema";

    // Insere o conteúdo HTML do resumo
    conteudoResumo.innerHTML = resumoHTML;

    // Esconde a tela de modos e mostra a tela de resumo
    telaModos.classList.remove("ativa");
    telaResumo.classList.add("ativa");
}

// Mostra a tela de resumo de um tema específico da biblioteca
function mostrarResumoTema(tema) {
    // Pega o resumo correspondente ao tema da biblioteca
    const resumoHTML = resumosBiblioteca[tema];

    // Define o título baseado no tema
    const titulos = {
        variaveis: "📦 Variáveis em JavaScript",
        funcoes: "⚙️ Funções em JavaScript",
        arrays: "📋 Arrays em JavaScript",
        objetos: "🔷 Objetos em JavaScript",
        operadores: "➕ Operadores em JavaScript",
        condicionais: "🔀 Condicionais em JavaScript"
    };

    // Atualiza o título da tela
    tituloResumo.textContent = titulos[tema] || "Resumo do Tema";

    // Insere o conteúdo HTML do resumo
    conteudoResumo.innerHTML = resumoHTML;

    // Esconde a tela de biblioteca e mostra a tela de resumo
    telaBiblioteca.classList.remove("ativa");
    telaResumo.classList.add("ativa");
}

// Volta da tela de resumo para a tela de modos
function voltarDoResumoParaModos() {
    telaResumo.classList.remove("ativa");

    // Verifica de onde veio: se é tema da biblioteca, volta para biblioteca
    if (resumosBiblioteca[modoTemporario]) {
        telaBiblioteca.classList.add("ativa");
    } else {
        // Senão, volta para tela de modos
        telaModos.classList.add("ativa");
    }

    // Limpa o modo temporário
    modoTemporario = "";
}

// Função que permite sair do quiz sem terminar
// Volta para a tela de onde o quiz foi iniciado (Modos ou Biblioteca)
function sairDoQuiz() {
    // Remove a tela do quiz
    telaQuiz.classList.remove("ativa");

    // Verifica se o modo selecionado veio da biblioteca
    // Se o modo está no objeto de resumos da biblioteca, volta para biblioteca
    if (resumosBiblioteca[modoSelecionado]) {
        telaBiblioteca.classList.add("ativa");
    } else {
        // Senão, volta para tela de modos (iniciante, intermediário, avançado, desafio)
        telaModos.classList.add("ativa");
    }

    // Reseta as variáveis do jogo para limpar o estado
    questaoAtual = 0;
    pontuacao = 0;
    modoSelecionado = "";
    perguntasDoQuiz = [];
}

// Função que prepara e inicia o jogo com o modo escolhido
function iniciarJogo(modo) {
    // Armazena qual modo foi escolhido
    modoSelecionado = modo;

    // Reseta as variáveis do jogo
    questaoAtual = 0;
    pontuacao = 0;

    // Seleciona as perguntas baseado no modo escolhido
    if (modo === "iniciante") {
        // Seleciona 10 perguntas aleatórias das 50 disponíveis
        perguntasDoQuiz = selecionarPerguntasAleatorias(perguntasIniciante, 10);
        modoAtualSpan.textContent = "Iniciante 🌱";
    } else if (modo === "intermediario") {
        // Seleciona 10 perguntas aleatórias das 50 disponíveis
        perguntasDoQuiz = selecionarPerguntasAleatorias(perguntasIntermediario, 10);
        modoAtualSpan.textContent = "Intermediário 🔥";
    } else if (modo === "avancado") {
        // Seleciona 10 perguntas aleatórias das 50 disponíveis
        perguntasDoQuiz = selecionarPerguntasAleatorias(perguntasAvancado, 10);
        modoAtualSpan.textContent = "Avançado ⚡";
    } else if (modo === "desafio") {
        // Modo Desafio: 15 perguntas aleatórias de TODOS os níveis
        perguntasDoQuiz = criarQuizDesafio();
        modoAtualSpan.textContent = "Desafio 🏆";
    }

    // Esconde as telas de modos e resumo, e mostra a tela do quiz
    telaModos.classList.remove("ativa");
    telaResumo.classList.remove("ativa");
    telaQuiz.classList.add("ativa");

    // Mostra a primeira pergunta
    mostrarPergunta();
}

// Função que cria o quiz do modo Desafio
// Pega 15 perguntas aleatórias de TODOS os níveis
function criarQuizDesafio() {
    // Junta todas as perguntas em um único array
    // ... é o spread operator (espalha os itens do array)
    const todasPerguntas = [
        ...perguntasIniciante,
        ...perguntasIntermediario,
        ...perguntasAvancado
    ];

    // Seleciona 15 perguntas aleatórias de todos os níveis misturados
    return selecionarPerguntasAleatorias(todasPerguntas, 15);
}

// Função genérica que seleciona N perguntas aleatórias de um banco
// Recebe o banco de perguntas e quantas selecionar
// Retorna array com as perguntas selecionadas (sem repetição)
function selecionarPerguntasAleatorias(bancoPerguntas, quantidade) {
    // Cria uma cópia para não modificar o original
    let perguntasDisponiveis = [...bancoPerguntas];

    // Array que vai receber as perguntas selecionadas
    let perguntasSelecionadas = [];

    // Seleciona a quantidade especificada de perguntas aleatórias
    for (let i = 0; i < quantidade; i++) {
        // Gera um índice aleatório
        // Math.random() gera número entre 0 e 1
        // Math.floor() arredonda para baixo
        const indiceAleatorio = Math.floor(Math.random() * perguntasDisponiveis.length);

        // Pega a pergunta no índice aleatório
        const perguntaSelecionada = perguntasDisponiveis[indiceAleatorio];

        // Adiciona no array de selecionadas
        perguntasSelecionadas.push(perguntaSelecionada);

        // Remove a pergunta já selecionada para não repetir
        // splice remove itens do array
        perguntasDisponiveis.splice(indiceAleatorio, 1);
    }

    // Retorna as perguntas selecionadas
    return perguntasSelecionadas;
}

// Função que exibe a pergunta atual na tela
function mostrarPergunta() {
    // Pega a pergunta atual do array
    const pergunta = perguntasDoQuiz[questaoAtual];

    // Atualiza o texto da pergunta
    textoPergunta.textContent = pergunta.pergunta;

    // Atualiza o número da questão
    numeroQuestao.textContent = `Questão ${questaoAtual + 1} de ${perguntasDoQuiz.length}`;

    // Atualiza a pontuação
    pontuacaoSpan.textContent = `Pontos: ${pontuacao}`;

    // Calcula e atualiza a barra de progresso (em porcentagem)
    const progresso = ((questaoAtual + 1) / perguntasDoQuiz.length) * 100;
    barraProgresso.style.width = progresso + "%";

    // Limpa as opções anteriores
    opcoesResposta.innerHTML = "";

    // Cria um botão para cada opção de resposta
    pergunta.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");
        botao.classList.add("opcao");
        botao.textContent = opcao;

        // Quando clicado, verifica a resposta
        botao.addEventListener("click", () => verificarResposta(indice));

        // Adiciona o botão na tela
        opcoesResposta.appendChild(botao);
    });

    // Esconde o feedback
    feedbackDiv.classList.add("escondido");
}

// Função que verifica se a resposta escolhida está correta
function verificarResposta(indiceEscolhido) {
    const pergunta = perguntasDoQuiz[questaoAtual];
    const botoes = document.querySelectorAll(".opcao");

    // Desabilita todos os botões (não pode mais clicar)
    botoes.forEach(botao => {
        botao.classList.add("desabilitada");
    });

    // Verifica se acertou
    if (indiceEscolhido === pergunta.respostaCorreta) {
        // ACERTOU!
        pontuacao = pontuacao + PONTOS_POR_ACERTO;

        // Marca o botão de verde
        botoes[indiceEscolhido].classList.add("correta");

        // Mostra feedback positivo
        textoFeedback.textContent = "✅ Correto! " + pergunta.explicacao;
        textoFeedback.style.color = "#4caf50";

    } else {
        // ERROU!
        // Marca o botão escolhido de vermelho
        botoes[indiceEscolhido].classList.add("incorreta");

        // Marca a resposta correta de verde
        botoes[pergunta.respostaCorreta].classList.add("correta");

        // Mostra feedback negativo
        textoFeedback.textContent = "❌ Incorreto! " + pergunta.explicacao;
        textoFeedback.style.color = "#f44336";
    }

    // Mostra a área de feedback
    feedbackDiv.classList.remove("escondido");
}

// Função que avança para a próxima pergunta
function proximaPergunta() {
    // Incrementa o contador
    questaoAtual++;

    // Verifica se ainda há perguntas
    if (questaoAtual < perguntasDoQuiz.length) {
        // Ainda tem perguntas, mostra a próxima
        mostrarPergunta();
    } else {
        // Acabaram as perguntas, mostra o resultado
        mostrarResultado();
    }
}

// Função que mostra a tela de resultado final
function mostrarResultado() {
    // Esconde o quiz
    telaQuiz.classList.remove("ativa");

    // Mostra a tela de resultado
    telaResultado.classList.add("ativa");

    // Calcula a pontuação máxima possível
    const pontuacaoMaxima = perguntasDoQuiz.length * PONTOS_POR_ACERTO;

    // Exibe a pontuação
    pontuacaoFinal.textContent = `${pontuacao} / ${pontuacaoMaxima}`;

    // Define mensagem baseada na performance
    let mensagem = "";
    const percentualAcerto = (pontuacao / pontuacaoMaxima) * 100;

    if (percentualAcerto === 100) {
        mensagem = "🏆 PERFEITO! Você é um mestre das variáveis!";
    } else if (percentualAcerto >= 80) {
        mensagem = "🎉 Excelente! Você domina o assunto!";
    } else if (percentualAcerto >= 60) {
        mensagem = "👏 Muito bem! Você está no caminho certo!";
    } else if (percentualAcerto >= 40) {
        mensagem = "👍 Bom trabalho! Continue estudando!";
    } else {
        mensagem = "💪 Continue praticando! Você vai melhorar!";
    }

    // Adiciona informação sobre o modo
    mensagem += ` (Modo: ${modoSelecionado})`;

    mensagemFinal.textContent = mensagem;
}

// Função que reinicia o jogo
function reiniciarJogo() {
    // Reseta variáveis
    questaoAtual = 0;
    pontuacao = 0;
    modoSelecionado = "";
    perguntasDoQuiz = [];

    // Esconde a tela de resultado
    telaResultado.classList.remove("ativa");

    // Volta para a tela inicial
    telaInicial.classList.add("ativa");
}

// ========================================
// RESUMO DOS CONCEITOS DE VARIÁVEIS
// ========================================

/*
VAR (antiga, evite usar):
- Escopo de função ou global
- Pode ser redeclarada
- Sofre de "hoisting" (elevação)
- Vira propriedade de 'window' se global
- Exemplo: var nome = "João";

LET (moderna, use quando o valor VAI MUDAR):
- Escopo de bloco {}
- NÃO pode ser redeclarada no mesmo escopo
- Valor PODE ser reatribuído
- Sofre hoisting mas fica em "Temporal Dead Zone"
- Exemplo: let idade = 25; idade = 26; ✅

CONST (moderna, use quando o valor NÃO VAI MUDAR):
- Escopo de bloco {}
- NÃO pode ser redeclarada
- Valor NÃO pode ser reatribuído
- Mas propriedades de objetos/arrays podem mudar!
- Exemplo: const PI = 3.14; ✅
- Exemplo inválido: const PI = 3.14; PI = 3.15; ❌

DICA IMPORTANTE:
1. Use const por padrão
2. Use let quando precisar reatribuir
3. Evite var em código moderno
4. Mantenha variáveis no menor escopo possível
5. Use nomes descritivos (let idade, const API_URL)

CONCEITOS AVANÇADOS:
- Hoisting: Declarações são "elevadas" para o topo
- Temporal Dead Zone: Período onde let/const não podem ser acessadas
- Closure: Função que acessa variáveis do escopo externo
- Escopo: Onde a variável pode ser acessada
*/

// ========================================
// BIBLIOTECA DE TEMAS - BANCOS DE PERGUNTAS
// ========================================

// Cada tema tem 20 questões com níveis variados
// O quiz vai selecionar 10 aleatoriamente

// TEMA: VARIÁVEIS (20 questões - mix de níveis)
const bibliotecaVariaveis = [
    // Questões fáceis (1-8)
    {
        pergunta: "Qual palavra-chave declara uma variável que pode mudar de valor?",
        opcoes: ["const", "let", "final", "static"],
        respostaCorreta: 1,
        explicacao: "'let' permite reatribuição de valores. Use quando o valor vai mudar!",
        nivel: "fácil"
    },
    {
        pergunta: "Qual palavra-chave declara uma constante?",
        opcoes: ["var", "let", "const", "constant"],
        respostaCorreta: 2,
        explicacao: "'const' cria constantes - valores que não podem ser reatribuídos!",
        nivel: "fácil"
    },
    {
        pergunta: "É possível declarar let sem valor inicial?",
        opcoes: ["Não, sempre precisa valor", "Sim, fica undefined", "Gera erro", "Fica null"],
        respostaCorreta: 1,
        explicacao: "Sim! 'let x;' cria a variável com valor undefined até você atribuir algo.",
        nivel: "fácil"
    },
    {
        pergunta: "Qual está correto?",
        opcoes: ["let 1nome = 'Ana'", "let nome-completo = 'Ana'", "let nomeCompleto = 'Ana'", "let nome completo = 'Ana'"],
        respostaCorreta: 2,
        explicacao: "Variáveis não podem começar com número, ter hífen ou espaços. Use camelCase!",
        nivel: "fácil"
    },
    {
        pergunta: "O que é undefined?",
        opcoes: ["Erro", "Variável declarada sem valor", "Variável deletada", "null"],
        respostaCorreta: 1,
        explicacao: "undefined significa que a variável foi declarada mas não tem valor atribuído.",
        nivel: "fácil"
    },
    {
        pergunta: "Posso usar const para arrays?",
        opcoes: ["Não", "Sim, mas não posso adicionar itens", "Sim, posso adicionar itens", "Só com var"],
        respostaCorreta: 2,
        explicacao: "Sim! const impede reatribuição, mas você pode modificar o conteúdo do array.",
        nivel: "fácil"
    },
    {
        pergunta: "Qual forma é recomendada atualmente?",
        opcoes: ["Sempre var", "Sempre let", "const por padrão, let quando necessário", "Tanto faz"],
        respostaCorreta: 2,
        explicacao: "Use const por padrão! Só mude para let se precisar reatribuir o valor.",
        nivel: "fácil"
    },
    {
        pergunta: "O que acontece? const x = 5; x = 10;",
        opcoes: ["x vira 10", "Gera erro", "x fica undefined", "x vira null"],
        respostaCorreta: 1,
        explicacao: "Erro! Não pode reatribuir const. TypeError: Assignment to constant variable.",
        nivel: "fácil"
    },

    // Questões médias (9-14)
    {
        pergunta: "O que é escopo de bloco?",
        opcoes: ["Variável global", "Variável dentro de { }", "Variável de função", "Não existe"],
        respostaCorreta: 1,
        explicacao: "Escopo de bloco: variável só existe entre chaves { }. let e const têm escopo de bloco.",
        nivel: "médio"
    },
    {
        pergunta: "if(true) { let x = 5; } console.log(x); - O que acontece?",
        opcoes: ["Imprime 5", "Imprime undefined", "ReferenceError", "null"],
        respostaCorreta: 2,
        explicacao: "ReferenceError! x só existe dentro do bloco if (escopo de bloco).",
        nivel: "médio"
    },
    {
        pergunta: "Qual tem escopo de bloco?",
        opcoes: ["var", "let e const", "Apenas let", "Nenhuma"],
        respostaCorreta: 1,
        explicacao: "let e const têm escopo de bloco. var tem escopo de função!",
        nivel: "médio"
    },
    {
        pergunta: "Diferença entre null e undefined?",
        opcoes: ["São iguais", "undefined é ausência, null é intencional", "null é erro", "Não há"],
        respostaCorreta: 1,
        explicacao: "undefined = não há valor. null = você intencionalmente definiu como vazio!",
        nivel: "médio"
    },
    {
        pergunta: "const obj = {a: 1}; obj.a = 2; - Funciona?",
        opcoes: ["Não, gera erro", "Sim, obj.a vira 2", "obj fica undefined", "obj.a fica null"],
        respostaCorreta: 1,
        explicacao: "Sim! const impede reatribuir o objeto, mas propriedades podem mudar.",
        nivel: "médio"
    },
    {
        pergunta: "typeof de variável não declarada retorna?",
        opcoes: ["error", "undefined", "null", "ReferenceError"],
        respostaCorreta: 1,
        explicacao: "Retorna 'undefined' sem gerar erro! typeof é seguro para variáveis não declaradas.",
        nivel: "médio"
    },

    // Questões difíceis (15-20)
    {
        pergunta: "O que é Temporal Dead Zone (TDZ)?",
        opcoes: ["Bug do JS", "Período onde let/const não podem ser acessadas", "Zona deletada", "Timeout"],
        respostaCorreta: 1,
        explicacao: "TDZ: período entre início do bloco e declaração onde let/const não são acessíveis!",
        nivel: "difícil"
    },
    {
        pergunta: "console.log(x); var x = 5; - Resultado?",
        opcoes: ["5", "undefined", "ReferenceError", "null"],
        respostaCorreta: 1,
        explicacao: "undefined! Por hoisting, var x é elevada mas a atribuição não.",
        nivel: "difícil"
    },
    {
        pergunta: "console.log(y); let y = 5; - Resultado?",
        opcoes: ["5", "undefined", "ReferenceError", "null"],
        respostaCorreta: 2,
        explicacao: "ReferenceError! let sofre hoisting mas fica na TDZ antes da declaração.",
        nivel: "difícil"
    },
    {
        pergunta: "Como tornar objeto totalmente imutável?",
        opcoes: ["const obj = {}", "Object.freeze(obj)", "Object.seal(obj)", "Não é possível"],
        respostaCorreta: 1,
        explicacao: "Object.freeze() torna objeto e propriedades imutáveis! const sozinho não basta.",
        nivel: "difícil"
    },
    {
        pergunta: "var no escopo global vira propriedade de qual objeto?",
        opcoes: ["document", "window", "global", "Object"],
        respostaCorreta: 1,
        explicacao: "var global vira propriedade de window! let/const não viram.",
        nivel: "difícil"
    },
    {
        pergunta: "Posso redeclarar let no mesmo escopo?",
        opcoes: ["Sim", "Não, SyntaxError", "Sim com strict mode", "Depende"],
        respostaCorreta: 1,
        explicacao: "Não! Redeclarar let no mesmo escopo causa SyntaxError.",
        nivel: "difícil"
    }
];

// TEMA: FUNÇÕES (20 questões - mix de níveis)
const bibliotecaFuncoes = [
    // Fáceis
    {
        pergunta: "Como declarar uma função básica?",
        opcoes: ["func soma() {}", "function soma() {}", "def soma() {}", "fn soma() {}"],
        respostaCorreta: 1,
        explicacao: "Use 'function' para declarar funções em JavaScript!",
        nivel: "fácil"
    },
    {
        pergunta: "Como chamar a função soma?",
        opcoes: ["call soma", "soma()", "execute soma", "run soma()"],
        respostaCorreta: 1,
        explicacao: "Use parênteses para chamar: soma()",
        nivel: "fácil"
    },
    {
        pergunta: "function retorna valor com qual palavra?",
        opcoes: ["output", "return", "give", "send"],
        respostaCorreta: 1,
        explicacao: "'return' retorna o valor da função!",
        nivel: "fácil"
    },
    {
        pergunta: "Função sem return retorna o quê?",
        opcoes: ["0", "null", "undefined", "false"],
        respostaCorreta: 2,
        explicacao: "Funções sem return retornam undefined automaticamente!",
        nivel: "fácil"
    },
    {
        pergunta: "Como declarar arrow function?",
        opcoes: ["=> function", "() => {}", "-> {}", "function =>"],
        respostaCorreta: 1,
        explicacao: "Arrow function: () => {} - forma moderna e concisa!",
        nivel: "fácil"
    },
    {
        pergunta: "Parâmetros são declarados onde?",
        opcoes: ["Após {}", "Entre ()", "Antes function", "Depois return"],
        respostaCorreta: 1,
        explicacao: "Parâmetros vão entre parênteses: function soma(a, b)",
        nivel: "fácil"
    },
    {
        pergunta: "Posso ter função dentro de função?",
        opcoes: ["Não", "Sim", "Só com var", "Só global"],
        respostaCorreta: 1,
        explicacao: "Sim! Funções podem ser aninhadas (nested functions).",
        nivel: "fácil"
    },
    {
        pergunta: "const fn = () => 5; - fn() retorna?",
        opcoes: ["undefined", "5", "erro", "null"],
        respostaCorreta: 1,
        explicacao: "Arrow function com expressão única retorna automaticamente: 5",
        nivel: "fácil"
    },

    // Médias
    {
        pergunta: "Diferença entre function e arrow function com 'this'?",
        opcoes: ["Nenhuma", "Arrow não tem próprio this", "Function não tem this", "Ambas iguais"],
        respostaCorreta: 1,
        explicacao: "Arrow function não tem próprio 'this', usa o this do contexto externo!",
        nivel: "médio"
    },
    {
        pergunta: "O que é parâmetro default?",
        opcoes: ["Erro", "Valor padrão se não passar argumento", "Primeiro parâmetro", "undefined"],
        respostaCorreta: 1,
        explicacao: "Parâmetro default: function soma(a = 0, b = 0) - valores padrão!",
        nivel: "médio"
    },
    {
        pergunta: "function soma(a, b) {} - Chamei soma(5). b vale?",
        opcoes: ["0", "undefined", "null", "erro"],
        respostaCorreta: 1,
        explicacao: "Parâmetros não passados ficam undefined!",
        nivel: "médio"
    },
    {
        pergunta: "O que é rest parameter (...args)?",
        opcoes: ["Bug", "Coleta argumentos em array", "Espalha array", "Para função"],
        respostaCorreta: 1,
        explicacao: "...args coleta todos argumentos restantes em um array!",
        nivel: "médio"
    },
    {
        pergunta: "Posso armazenar função em variável?",
        opcoes: ["Não", "Sim, funções são valores", "Só com var", "Só arrow"],
        respostaCorreta: 1,
        explicacao: "Sim! Funções são first-class citizens, podem ser armazenadas em variáveis.",
        nivel: "médio"
    },
    {
        pergunta: "O que é callback?",
        opcoes: ["Erro de função", "Função passada como argumento", "Retorno", "Loop"],
        respostaCorreta: 1,
        explicacao: "Callback: função passada como argumento para outra função!",
        nivel: "médio"
    },

    // Difíceis
    {
        pergunta: "O que é closure?",
        opcoes: ["Função fechada", "Função que acessa variáveis do escopo pai", "Função anônima", "Erro"],
        respostaCorreta: 1,
        explicacao: "Closure: função que 'lembra' e acessa variáveis do escopo onde foi criada!",
        nivel: "difícil"
    },
    {
        pergunta: "Function declaration sofre hoisting?",
        opcoes: ["Não", "Sim, completamente", "Só declaração", "Depende"],
        respostaCorreta: 1,
        explicacao: "Sim! Function declarations são completamente elevadas (podem ser usadas antes).",
        nivel: "difícil"
    },
    {
        pergunta: "const fn = function() {} - Sofre hoisting?",
        opcoes: ["Sim, completamente", "Não, ReferenceError antes", "Undefined", "Depende"],
        respostaCorreta: 1,
        explicacao: "Function expression: a variável sofre hoisting, mas fica undefined antes da declaração!",
        nivel: "difícil"
    },
    {
        pergunta: "O que é IIFE?",
        opcoes: ["Erro", "Função executada imediatamente", "Loop infinito", "Async function"],
        respostaCorreta: 1,
        explicacao: "IIFE (Immediately Invoked Function Expression): (function(){})() - executa na hora!",
        nivel: "difícil"
    },
    {
        pergunta: "Arrow function pode ser construtora (new)?",
        opcoes: ["Sim", "Não, TypeError", "Só com class", "Depende"],
        respostaCorreta: 1,
        explicacao: "Não! Arrow functions não podem ser construtoras, gera TypeError.",
        nivel: "difícil"
    },
    {
        pergunta: "O que é recursão?",
        opcoes: ["Loop", "Função que chama a si mesma", "Erro", "Callback"],
        respostaCorreta: 1,
        explicacao: "Recursão: função que chama a si mesma! Precisa de condição de parada.",
        nivel: "difícil"
    }
];

// TEMA: ARRAYS (20 questões)
const bibliotecaArrays = [
    // Fáceis
    {
        pergunta: "Como criar array vazio?",
        opcoes: ["array()", "[]", "{}", "new List()"],
        respostaCorreta: 1,
        explicacao: "Use colchetes: const arr = []",
        nivel: "fácil"
    },
    {
        pergunta: "Como acessar primeiro elemento de arr?",
        opcoes: ["arr[1]", "arr[0]", "arr.first", "arr(0)"],
        respostaCorreta: 1,
        explicacao: "Arrays começam no índice 0: arr[0]",
        nivel: "fácil"
    },
    {
        pergunta: "arr.length retorna o quê?",
        opcoes: ["Último índice", "Quantidade de elementos", "Tamanho em bytes", "undefined"],
        respostaCorreta: 1,
        explicacao: "length retorna o número de elementos no array!",
        nivel: "fácil"
    },
    {
        pergunta: "Qual adiciona elemento no final?",
        opcoes: ["arr.add()", "arr.push()", "arr.append()", "arr.insert()"],
        respostaCorreta: 1,
        explicacao: "push() adiciona elemento(s) no final do array!",
        nivel: "fácil"
    },
    {
        pergunta: "Qual remove último elemento?",
        opcoes: ["arr.remove()", "arr.pop()", "arr.delete()", "arr.removeLast()"],
        respostaCorreta: 1,
        explicacao: "pop() remove e retorna o último elemento!",
        nivel: "fácil"
    },
    {
        pergunta: "Qual adiciona elemento no início?",
        opcoes: ["arr.addFirst()", "arr.unshift()", "arr.prepend()", "arr.push(0)"],
        respostaCorreta: 1,
        explicacao: "unshift() adiciona elemento(s) no início!",
        nivel: "fácil"
    },
    {
        pergunta: "Como verificar se é array?",
        opcoes: ["typeof arr", "Array.isArray(arr)", "arr.isArray()", "instanceof Array"],
        respostaCorreta: 1,
        explicacao: "Array.isArray(arr) verifica se é array (typeof retorna 'object')!",
        nivel: "fácil"
    },
    {
        pergunta: "[1, 2, 3].includes(2) retorna?",
        opcoes: ["true", "false", "undefined", "2"],
        respostaCorreta: 0,
        explicacao: "includes() verifica se array contém o valor, retorna true!",
        nivel: "fácil"
    },

    // Médias
    {
        pergunta: "arr.map() faz o quê?",
        opcoes: ["Remove elementos", "Cria novo array transformado", "Busca elemento", "Soma elementos"],
        respostaCorreta: 1,
        explicacao: "map() transforma cada elemento e retorna novo array!",
        nivel: "médio"
    },
    {
        pergunta: "arr.filter() retorna?",
        opcoes: ["Primeiro elemento", "Novo array com elementos filtrados", "Boolean", "undefined"],
        respostaCorreta: 1,
        explicacao: "filter() retorna novo array só com elementos que passaram no teste!",
        nivel: "médio"
    },
    {
        pergunta: "arr.find() retorna o quê?",
        opcoes: ["Todos elementos", "Primeiro elemento encontrado", "Índice", "Boolean"],
        respostaCorreta: 1,
        explicacao: "find() retorna o PRIMEIRO elemento que satisfaz a condição (ou undefined)!",
        nivel: "médio"
    },
    {
        pergunta: "arr.reduce() serve para?",
        opcoes: ["Remover", "Reduzir array a um único valor", "Filtrar", "Ordenar"],
        respostaCorreta: 1,
        explicacao: "reduce() acumula valores do array em um único resultado!",
        nivel: "médio"
    },
    {
        pergunta: "arr.slice(1, 3) altera o array original?",
        opcoes: ["Sim", "Não, retorna cópia", "Às vezes", "Só com const"],
        respostaCorreta: 1,
        explicacao: "slice() retorna cópia sem modificar o original!",
        nivel: "médio"
    },
    {
        pergunta: "arr.splice() altera o original?",
        opcoes: ["Não", "Sim, modifica o array", "Depende", "Só com let"],
        respostaCorreta: 1,
        explicacao: "splice() modifica o array original (adiciona/remove elementos)!",
        nivel: "médio"
    },

    // Difíceis
    {
        pergunta: "Diferença entre for...of e for...in em arrays?",
        opcoes: ["Nenhuma", "for...of itera valores, for...in índices", "São iguais", "for...in é erro"],
        respostaCorreta: 1,
        explicacao: "for...of itera VALORES, for...in itera ÍNDICES (chaves)!",
        nivel: "difícil"
    },
    {
        pergunta: "arr.flat() faz o quê?",
        opcoes: ["Ordena", "Achata arrays aninhados", "Remove duplicatas", "Inverte"],
        respostaCorreta: 1,
        explicacao: "flat() achata arrays aninhados em um nível único!",
        nivel: "difícil"
    },
    {
        pergunta: "[1, 2] == [1, 2] retorna?",
        opcoes: ["true", "false", "undefined", "erro"],
        respostaCorreta: 1,
        explicacao: "false! Arrays são comparados por referência, não por conteúdo!",
        nivel: "difícil"
    },
    {
        pergunta: "arr.sort() sem argumento ordena como?",
        opcoes: ["Numérico", "Alfabético (string)", "Aleatório", "Crescente"],
        respostaCorreta: 1,
        explicacao: "sort() sem função converte para string e ordena alfabeticamente!",
        nivel: "difícil"
    },
    {
        pergunta: "const arr = [1,2]; arr[10] = 10; arr.length vale?",
        opcoes: ["3", "10", "11", "undefined"],
        respostaCorreta: 2,
        explicacao: "11! JavaScript cria 'buracos' (empty slots) entre índices!",
        nivel: "difícil"
    },
    {
        pergunta: "Spread em array: [...arr] faz?",
        opcoes: ["Erro", "Cópia rasa do array", "Inverte", "Soma elementos"],
        respostaCorreta: 1,
        explicacao: "Spread cria cópia rasa (shallow copy) do array!",
        nivel: "difícil"
    }
];

// TEMA: OBJETOS (20 questões)
const bibliotecaObjetos = [
    // Fáceis
    {
        pergunta: "Como criar objeto vazio?",
        opcoes: ["[]", "{}", "new Object", "object()"],
        respostaCorreta: 1,
        explicacao: "Use chaves: const obj = {}",
        nivel: "fácil"
    },
    {
        pergunta: "Como acessar propriedade 'nome'?",
        opcoes: ["obj[nome]", "obj.nome ou obj['nome']", "obj->nome", "obj::nome"],
        respostaCorreta: 1,
        explicacao: "Use ponto ou colchetes: obj.nome ou obj['nome']",
        nivel: "fácil"
    },
    {
        pergunta: "Como adicionar propriedade 'idade'?",
        opcoes: ["obj.add('idade', 25)", "obj.idade = 25", "obj->idade = 25", "obj['idade'] += 25"],
        respostaCorreta: 1,
        explicacao: "Basta atribuir: obj.idade = 25",
        nivel: "fácil"
    },
    {
        pergunta: "delete obj.nome faz o quê?",
        opcoes: ["Erro", "Remove a propriedade", "Define como null", "Define como undefined"],
        respostaCorreta: 1,
        explicacao: "delete remove a propriedade do objeto!",
        nivel: "fácil"
    },
    {
        pergunta: "Como verificar se propriedade existe?",
        opcoes: ["obj.has('nome')", "'nome' in obj", "obj.exists('nome')", "obj.contains('nome')"],
        respostaCorreta: 1,
        explicacao: "'nome' in obj verifica se a propriedade existe!",
        nivel: "fácil"
    },
    {
        pergunta: "Método é o quê?",
        opcoes: ["Variável no objeto", "Função dentro do objeto", "Propriedade string", "Tipo de dado"],
        respostaCorreta: 1,
        explicacao: "Método é uma função armazenada como propriedade do objeto!",
        nivel: "fácil"
    },
    {
        pergunta: "this em método se refere a?",
        opcoes: ["Window", "O próprio objeto", "undefined", "Function"],
        respostaCorreta: 1,
        explicacao: "this dentro de método aponta para o próprio objeto!",
        nivel: "fácil"
    },
    {
        pergunta: "Object.keys(obj) retorna?",
        opcoes: ["Valores", "Array de chaves", "Objeto", "String"],
        respostaCorreta: 1,
        explicacao: "Object.keys() retorna array com todas as chaves (propriedades)!",
        nivel: "fácil"
    },

    // Médias
    {
        pergunta: "Object.values(obj) retorna?",
        opcoes: ["Chaves", "Array de valores", "Objeto", "String"],
        respostaCorreta: 1,
        explicacao: "Object.values() retorna array com todos os valores!",
        nivel: "médio"
    },
    {
        pergunta: "Object.entries(obj) retorna?",
        opcoes: ["Array de [chave, valor]", "Objeto", "String", "Apenas chaves"],
        respostaCorreta: 0,
        explicacao: "Object.entries() retorna array de pares [chave, valor]!",
        nivel: "médio"
    },
    {
        pergunta: "Shorthand property: {nome} quando nome='Ana'?",
        opcoes: ["Erro", "{nome: 'Ana'}", "{nome: nome}", "undefined"],
        respostaCorreta: 1,
        explicacao: "Shorthand: {nome} é igual a {nome: nome} quando variável tem mesmo nome!",
        nivel: "médio"
    },
    {
        pergunta: "const obj = {a: 1}; Object.freeze(obj); obj.a = 2; obj.a vale?",
        opcoes: ["2", "1", "undefined", "erro"],
        respostaCorreta: 1,
        explicacao: "1! freeze() impede modificações (em strict mode dá erro)!",
        nivel: "médio"
    },
    {
        pergunta: "Spread em objeto: {...obj}?",
        opcoes: ["Erro", "Cópia rasa", "Cópia profunda", "undefined"],
        respostaCorreta: 1,
        explicacao: "Spread cria cópia rasa (shallow copy) do objeto!",
        nivel: "médio"
    },
    {
        pergunta: "Computed property: {[variavel]: valor}?",
        opcoes: ["Erro", "Usa valor da variável como chave", "Cria array", "undefined"],
        respostaCorreta: 1,
        explicacao: "Computed property usa o VALOR da variável como nome da chave!",
        nivel: "médio"
    },

    // Difíceis
    {
        pergunta: "Diferença entre Object.freeze() e Object.seal()?",
        opcoes: ["Nenhuma", "freeze impede tudo, seal permite modificar valores", "Iguais", "seal é mais restritivo"],
        respostaCorreta: 1,
        explicacao: "freeze: imutável total. seal: pode modificar valores, mas não adicionar/remover propriedades!",
        nivel: "difícil"
    },
    {
        pergunta: "Object.assign(target, source) faz?",
        opcoes: ["Compara", "Copia propriedades de source para target", "Deleta", "Cria novo"],
        respostaCorreta: 1,
        explicacao: "Object.assign() copia propriedades para o objeto target!",
        nivel: "difícil"
    },
    {
        pergunta: "Desestruturação: const {nome} = obj; faz?",
        opcoes: ["Erro", "Extrai obj.nome para variável nome", "Cria objeto", "Delete propriedade"],
        respostaCorreta: 1,
        explicacao: "Destructuring extrai propriedade para variável com mesmo nome!",
        nivel: "difícil"
    },
    {
        pergunta: "this em arrow function de método?",
        opcoes: ["Aponta pro objeto", "Herda this do escopo externo", "undefined", "window"],
        respostaCorreta: 1,
        explicacao: "Arrow function não tem próprio this, herda do contexto externo!",
        nivel: "difícil"
    },
    {
        pergunta: "Object.create(proto) faz?",
        opcoes: ["Copia objeto", "Cria objeto com protótipo especificado", "Deleta", "Congela"],
        respostaCorreta: 1,
        explicacao: "Object.create() cria objeto com o protótipo especificado!",
        nivel: "difícil"
    },
    {
        pergunta: "obj1 = obj2 faz?",
        opcoes: ["Copia obj2", "Aponta para mesma referência", "Compara", "Erro"],
        respostaCorreta: 1,
        explicacao: "Atribuição copia a REFERÊNCIA, não o objeto! Ambos apontam pro mesmo objeto.",
        nivel: "difícil"
    }
];

// Mapeamento dos temas para seus bancos de perguntas
const bancoBiblioteca = {
    variaveis: bibliotecaVariaveis,
    funcoes: bibliotecaFuncoes,
    arrays: bibliotecaArrays,
    objetos: bibliotecaObjetos,
    // Os outros temas terão estrutura similar
    operadores: [], // Você pode adicionar depois
    condicionais: [] // Você pode adicionar depois
};

// ========================================
// FUNÇÕES DA BIBLIOTECA
// ========================================

// Mostra a tela da biblioteca
function mostrarBiblioteca() {
    telaModos.classList.remove("ativa");
    telaBiblioteca.classList.add("ativa");
}

// Volta da biblioteca para a tela de modos
function voltarParaModos() {
    telaBiblioteca.classList.remove("ativa");
    telaModos.classList.add("ativa");
}

// Inicia o quiz de um tema específico da biblioteca
function iniciarQuizTema(tema) {
    // Pega o banco de perguntas do tema
    const bancoDoTema = bancoBiblioteca[tema];

    // Verifica se o tema tem perguntas
    if (!bancoDoTema || bancoDoTema.length === 0) {
        alert("Este tema ainda não está disponível! Em breve adicionaremos mais conteúdo.");
        return;
    }

    // Armazena qual tema foi escolhido
    modoSelecionado = tema;

    // Reseta as variáveis do jogo
    questaoAtual = 0;
    pontuacao = 0;

    // Seleciona 10 perguntas aleatórias das 20 disponíveis
    perguntasDoQuiz = selecionarPerguntasAleatorias(bancoDoTema, 10);

    // Define o badge com o nome do tema
    const nomesTemas = {
        variaveis: "Variáveis 📦",
        funcoes: "Funções ⚙️",
        arrays: "Arrays 📋",
        objetos: "Objetos 🔷",
        operadores: "Operadores ➕",
        condicionais: "Condicionais 🔀"
    };

    modoAtualSpan.textContent = nomesTemas[tema] || "Biblioteca 📚";

    // Esconde a biblioteca e mostra o quiz
    telaBiblioteca.classList.remove("ativa");
    telaQuiz.classList.add("ativa");

    // Mostra a primeira pergunta
    mostrarPergunta();
}
