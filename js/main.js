window.addEventListener('load', init);

const difficulty = {
    easy: 5,
    medium: 3, 
    hard: 2
}
let currentDifficulty;
let time = currentDifficulty;
let timeLimit;
let score = 0;
let isPlaying;

const instructions = $('#instructions');
const currentWord = $('#current-word');
const wordInput = $('#word-input');
let currentIndex;
const scoreDisplay = $('#score');
const timeDisplay = $('#time');
const message = $('#message');
const seconds = $('#seconds');
const difficultyText = $('#difficulty-text');
const difficultyButtons = $('#difficulty-buttons');
const level = $('#level');
var currentLevel = 1;
const easyButton = $('#button-easy');
const mediumButton = $('#button-medium');
const hardButton = $('#button-hard');
const backDiv = $('#back-div');
const backButton = $('#back-button');
const enterBlink = $('#press-enter');
var isWrong;
var cWord;


const body = $('#body');
const game = $('#game');
const selectTheme = $('#select-theme');
const wdTheme = $('#wd-theme');
const hpTheme = $('#hp-theme');
const progTheme = $('#prog-theme');
const landBlink = $('#magic');
let words;



function init() {
    selectTheme.css("display", "block");
    seconds.html(currentDifficulty);
    currentIndex = 0;
    currentDifficulty = difficulty.easy;
    timeLimit = difficulty.easy;
    difficultyText.html("easy");
    isPlaying = false;
    setInterval(countdown, 10);
}

$(document).ready(function(){
    wdTheme.click(function(){
        words = wdWords;
        body.attr("class", "bg-wd");
        instructions.attr("class", "card card-body instructions-wd");
        easyButton.attr("class", "button-wd");
        mediumButton.attr("class", "button-wd");
        hardButton.attr("class", "button-wd");
        backButton.attr("class", "back-wd");
        wordInput.attr("class", "input-wd");
        currentWord.attr("class", "display-2");
        themeSelected();
    });
    hpTheme.click(function(){
        words = hpWords;
        body.attr("class", "bg-hp");
        instructions.attr("class", "card card-body instructions-hp");
        easyButton.attr("class", "button-hp");
        mediumButton.attr("class", "button-hp");
        hardButton.attr("class", "button-hp");
        backButton.attr("class", "back-hp");
        wordInput.attr("class", "input-hp");
        currentWord.attr("class", "display-2");
        themeSelected();
    });
    progTheme.click(function(){
        words = progWords;
        body.attr("class", "bg-prog");
        instructions.attr("class", "card card-body instructions-prog");
        easyButton.attr("class", "button-prog");
        mediumButton.attr("class", "button-prog");
        hardButton.attr("class", "button-prog");
        backButton.attr("class", "back-prog");
        wordInput.attr("class", "input-prog");
        currentWord.attr("class", "display-prog");
        themeSelected();
    });
});


function themeSelected(){
    selectTheme.css("display", "none");
    game.css("display", "block");
    backDiv.css("visibility", "visible");
    currentWord.css("display", "none");
    enterCounter = 0;
    enterBlink.html('');
    enterBlink.css("display", "block");
    message.html('');
    scoreDisplay.html("0");
    currentLevel = 1;
    level.html(currentLevel);
    seconds.html(currentDifficulty);
}
function setDifficulty(difficultySelection){
    if ( difficultySelection == "easy"){
        currentDifficulty = difficulty.easy;
        seconds.html(difficulty.easy);
        timeLimit = difficulty.easy;
    } else if ( difficultySelection == "medium" ){
        currentDifficulty = difficulty.medium;
        seconds.html(difficulty.medium);
        timeLimit = difficulty.medium;
    } else if ( difficultySelection == "hard"){
        currentDifficulty = difficulty.hard;
        seconds.html(difficulty.hard);
        timeLimit = difficulty.hard;
    }
    difficultyText.html(difficultySelection);
}
function showWord(words) {
    const randIndex  = Math.floor(Math.random()* words.length);
    cWord = words[randIndex];
    currentWord.html(cWord);
}

function countdown() {
    if ( isPlaying ){
        if(time > 0) {
            time -= .01;
            time = Math.round(time*100) / 100;
            timeDisplay.html(time);
        }  else if(time <= 0 && isPlaying) {
            timeDisplay.html("0.00");
            isPlaying = false;
            message.html("Game Over");
            enterCounter = 0;
            enterBlink.html("");
            enterBlink.css("display", "block");
            currentWord.css("display", "none");
            difficultyButtons.css("visibility","visible");
            currentWord.html("");
            enterCounter = 0;
            wordInput.css("visibility","hidden");
            backDiv.css("visibility", "visible");
        } 
    }
}

function startMatch() {
    isPlaying = true;
    difficultyButtons.css("visibility","hidden");
    backDiv.css("visibility", "hidden");
    time = currentDifficulty;
    isWrong = false;
}

function onKeyDown(e){
    if( isPlaying && e.keyCode >= 65  && e.keyCode <= 90){
        var currentChar = e.key;
        if( currentChar == cWord[currentIndex]){
            if( isWrong ){
                currentWord.html(cWord);
                isWrong = false;
            }
            wordInput.append(currentChar);
            currentIndex++;
            if( currentIndex >= currentWord.html().length){
                score++;
                scoreDisplay.html(score);
                if ( score % 10 == 0){
                    currentLevel++;
                    level.html(currentLevel);
                    seconds.html(Math.round((currentDifficulty - (currentLevel - 1)/10)*10)/10);
                }
                time = Math.round((currentDifficulty - (currentLevel - 1)/10)*10)/10;
                newWord();
            }
        }else{
            // console.log("wrong");
            if ( !isWrong ){
                isWrong = true;
                currentWord.html(cWord.substring(0,currentIndex) + "<span class='red'>" + cWord[currentIndex] + "</span>" + cWord.substring(currentIndex+1));
            }
        }
    } else if ( e.keyCode == 13 ) {
        if ( !isPlaying ){
            enterBlink.css("display", "none");
            currentWord.css("display", "block");
            wordInput.css("visibility", "visible");
            showWord(words);
            message.html("");
            wordInput.html("");
            currentIndex = 0;
            score = 0;
            scoreDisplay.html(score);
            currentLevel = 1;
            level.html(currentLevel);
            seconds.html(currentDifficulty);
            time = currentDifficulty;
            startMatch();
        }
    }
}

function newWord(){
    currentIndex = 0;
    wordInput.html("");
    showWord(words);
}


var magicWords = "Select Theme:";
    character_counter = 0;
function updateText(){
    landBlink.append(magicWords[character_counter++]);
    if(character_counter == magicWords.length + 1){
        character_counter = 0;
        landBlink.html('');
    }
}
setInterval(updateText,200);

var pressEnter = "PRESS ENTER";
    enterCounter = 0;
function updateEnter(){
    if( !isPlaying ){
        enterBlink.append(pressEnter[enterCounter++]);
        if(enterCounter == pressEnter.length + 1){
            enterCounter = 0;
            enterBlink.html('');
        }
    }
}
if( !isPlaying ){
    setInterval(updateEnter,200);
}

function goBack(){
    body.attr("class", "bg");
    selectTheme.css("display", "block");
    game.css("display", "none");
}

const wdWords = [
    'rick',
    'grimes',
    'carl',
    'shane',
    'lori',
    'andrea',
    'dale',
    'glenn',
    'daryl',
    'carol',
    'maggie',
    'michonne',
    'merle',
    'governor',
    'hershel',
    'beth',
    'tyreese',
    'sasha',
    'abraham',
    'eugene',
    'rosita',
    'bob',
    'tara',
    'gabriel',
    'gareth',
    'morgan',
    'jessie',
    'aaron',
    'spencer',
    'deanna',
    'denise',
    'dwight',
    'jesus',
    'gregory',
    'negan',
    'ezekiel',
    'simon',
    'enid',
    'judith',
    'jadis',
    'anne',
    'alden',
    'siddiq',
    'atlanta',
    'sheriff',
    'tank',
    'helicopter',
    'quarry',
    'farm',
    'cdc',
    'church',
    'well',
    'pharmacy',
    'camp',
    'highway',
    'intersection',
    'prison',
    'military',
    'woodbury',
    'arena',
    'martinez',
    'alexandria',
    'terminus',
    'cabin',
    'hospital',
    'library',
    'rv',
    'wolves',
    'hilltop',
    'sanctuary',
    'saviors',
    'kingdom',
    'pigs',
    'king',
    'oceanside',
    'cyndie',
    'scavengers',
    'walkers',
    'roamers',
    'zombies',
    'geeks',
    'lurkers',
    'biters',
    'muertos',
    'infected',
    'fire',
    'lucille',
    'axe',
    'sniper',
    'whisperer',
    'alpha',
    'lydia',
    'beta',
    'magna',
    'yumiko',
    'luke',
    'connie',
    'kelly'
];


const hpWords = [
    'aberto',
    'accio',
    'alohomora',
    'aparecium',
    'apparate',
    'ascendio',
    'avada',
    'kedavra',
    'bombarda',
    'confundo',
    'crucio',
    'engorgio',
    'patronum',
    'expelliarmus',
    'expulso',
    'incantatem',
    'geminio',
    'glacius',
    'herbivicus',
    'horcrux',
    'immobulus',
    'impedimenta',
    'imperio',
    'impervius',
    'incarcerous',
    'incendio',
    'legilimens',
    'levicorpus',
    'liberacorpus',
    'lumos',
    'mobilicorpus',
    'morsmordre',
    'obliviate',
    'obscuro',
    'orchideous',
    'protego',
    'quietus',
    'reducio',
    'reducto',
    'relashio',
    'rennervate',
    'reparo',
    'repello',
    'revelio',
    'rictusempra',
    'riddikulus',
    'sectumsempra',
    'serpensortia',
    'silencio',
    'ventus',
    'amortentia',
    'antidote',
    'elixer',
    'potion',
    'oculus',
    'veritaserum',
    'basilisk',
    'centaur',
    'chimaera',
    'cockatrice',
    'dragon',
    'fireball',
    'horntail',
    'firedrake',
    'fairy',
    'ghoul',
    'gnome',
    'griffin',
    'hippogriff',
    'manticore',
    'salamander',
    'troll',
    'unicorn',
    'werewolf',
    'dwarf',
    'giant',
    'goblin',
    'muggle',
    'ghost',
    'dementor',
    'gryffindor',
    'hufflepuff',
    'ravenclaw',
    'slytherin',
    'harry',
    'potter',
    'ron',
    'weasley',
    'hermione',
    'granger',
    'charity',
    'burbage',
    'armando',
    'dippet',
    'albus',
    'dumbledore',
    'argus',
    'filch',
    'filius',
    'flitwick',
    'rubeus',
    'hagrid',
    'rolanda',
    'hooch',
    'gilderoy',
    'lockhart',
    'minerva',
    'mcgonagall',
    'poppy',
    'pomfrey',
    'quirinus',
    'quirrell',
    'horace',
    'slughorn',
    'severus',
    'snape',
    'pomona',
    'sprout',
    'sybill',
    'trelawney',
    'hannah',
    'abbott',
    'marcus',
    'belby',
    'katie',
    'bell',
    'miles',
    'bletchley',
    'susan',
    'bones',
    'lavender',
    'millicent',
    'cho',
    'chang',
    'penelope',
    'clearwater',
    'vincent',
    'crabbe',
    'colin',
    'roger',
    'cedric',
    'diggory',
    'justin',
    'marcus',
    'flint',
    'seamus',
    'finnigan',
    'gregory',
    'terence',
    'angelina',
    'leanne',
    'lee',
    'neville',
    'longbottom',
    'luna',
    'lovegood',
    'ernie',
    'draco',
    'malfoy',
    'cormac',
    'pansy',
    'padma',
    'parvati',
    'adrian',
    'zacharias',
    'alicia',
    'dean',
    'romilda',
    'fred',
    'george',
    'ginny',
    'nigel',
    'oliver',
    'wood',
    'blaise',
    'sirius',
    'black',
    'dedalus',
    'diggle',
    'elphias',
    'aberforth',
    'arabella',
    'mundungus',
    'alice',
    'frank',
    'remus',
    'lupin',
    'alastor',
    'moody',
    'james',
    'lily',
    'kingsley',
    'nymphadora',
    'emmeline',
    'arthur',
    'bill',
    'charlie',
    'molly',
    'voldemort',
    'regulus',
    'alecto',
    'amycus',
    'barty',
    'antonin',
    'fenrir',
    'bellatrix',
    'lestrange',
    'walden',
    'macnair',
    'lucius',
    'peter',
    'pettigrew',
    'thorfinn',
    'scabior',
    'travers',
    'yaxley',
    'amelia',
    'mary',
    'reg',
    'amos',
    'cornelius',
    'fudge',
    'mafalda',
    'percy',
    'dudley',
    'dursley',
    'marge',
    'petunia',
    'vernon',
    'fleur',
    'gabrielle',
    'gregorovitch',
    'igor',
    'viktor',
    'klum',
    'olympe',
    'maxime',
    'cadogan',
    'moaning',
    'myrtle',
    'headless',
    'phineas',
    'peeves',
    'sorting',
    'xenophilius',
    'dobby',
    'kreacher',
    'quiddich'
]

const progWords = [
    'algorithm',
    'allocate',
    'ajax',
    'api',
    'applet',
    'argument',
    'arithmetic',
    'array',
    'ascii',
    'assembler',
    'assembly',
    'automation',
    'backend',
    'bean',
    'binary',
    'bool',
    'boolean',
    'bootstrap',
    'bug',
    'bytecode',
    'cplusplus',
    'camelcase',
    'character',
    'char',
    'class',
    'closure',
    'cocoa',
    'code',
    'command',
    'comment',
    'compile',
    'compiler',
    'compute',
    'computer',
    'constant',
    'constructor',
    'control',
    'cpl',
    'css',
    'curly',
    'cvs',
    'dataflow',
    'data',
    'debug',
    'database',
    'debugger',
    'debugging',
    'declare',
    'decompiler',
    'decrement',
    'delimiter',
    'dependent',
    'developer',
    'django',
    'div',
    'do',
    'dom',
    'dynamic',
    'ecmascript',
    'element',
    'ellipsis',
    'else',
    'elseif',
    'elsif',
    'embedded',
    'encode',
    'endless',
    'equal',
    'error',
    'escape',
    'event',
    'exception',
    'exponent',
    'expression',
    'false',
    'floating',
    'for',
    'foreach',
    'fortran',
    'framework',
    'frontend',
    'fullstack',
    'function',
    'functional',
    'game',
    'git',
    'github',
    'glitch',
    'go',
    'hash',
    'hashcode',
    'hashmap',
    'heap',
    'hello',
    'world',
    'highlevel',
    'html',
    'hypertext',
    'ifelse',
    'if',
    'immutable',
    'imperative',
    'implicit',
    'increment',
    'inline',
    'input',
    'output',
    'instance',
    'int',
    'integer',
    'invalid',
    'iteration',
    'java',
    'javabean',
    'javascript',
    'json',
    'lambda',
    'language',
    'lexicon',
    'loop',
    'lowlevel',
    'machine',
    'markup',
    'matlab',
    'meta',
    'method',
    'mod',
    'module',
    'modulo',
    'nan',
    'net',
    'native',
    'nested',
    'nil',
    'newline',
    'nodejs',
    'node',
    'null',
    'object',
    'oop',
    'operand',
    'operator',
    'overflow',
    'overload',
    'package',
    'pascal',
    'php',
    'pointer',
    'private',
    'procedure',
    'process',
    'program',
    'public',
    'python',
    'random',
    'react',
    'real',
    'recursion',
    'regex',
    'reserved',
    'rom',
    'routine',
    'ruby',
    'runtime',
    'sdk',
    'seed',
    'sequence',
    'servlet',
    'shell',
    'snippet',
    'socket',
    'software',
    'source',
    'sql',
    'stack',
    'queue',
    'statement',
    'stylesheet',
    'subscript',
    'substring',
    'switch',
    'syntactic',
    'syntax',
    'system',
    'token',
    'true',
    'undefined',
    'value',
    'var',
    'variable',
    'vector',
    'while',
    'xml',
    'mysql',
    'angular',
    'express',
    'mean',
    'spring',
    'typescript',
    'interface',
    'sass',
    'less',
    'mongodb',
    'nosql',
    'flask',
]