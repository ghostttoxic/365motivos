import React, { useState, useEffect } from 'react';
import { Heart, X, Sparkles, Star, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { supabase } from './supabase';

// --- 10 MOTIVOS DE OURO (INTRODUÇÃO) ---
const goldenReasonsList = [
  "Porque não existe no mundo ninguém que eu confiaria mais para guiar, proteger e amar o nosso Théo do que você; sua maternidade é a coisa mais linda que já vi.",
  "Porque em 10 anos, você viu todas as minhas versões, me apoiou em cada sonho maluco quando ninguém mais acreditava, e nunca soltou minha mão.",
  "Pela sua obstinação em se tornar veterinária; sua paixão pelos animais não é apenas uma profissão, é a pureza da sua alma.",
  "Porque você, Nina, é solar. Mesmo nos dias difíceis, você busca a luz e ilumina a vida de quem está ao seu redor com esse sorriso maravilhoso.",
  "Porque sua estatura não esconde a mulher gigante, forte e guerreira que você é diante da vida.",
  "Porque você me ensinou que a vida merece ser brindada, seja com uma cerveja gelada ou com uma nova experiência.",
  "Porque sua sensibilidade não é fraqueza, é o superpoder que te faz entender o mundo e as pessoas (e os bichos) de um jeito único.",
  "Pelo conjunto da obra — esses cabelos, esse sorriso e essa energia que te faz ser a mulher mais bonita que conheço.",
  "Porque relacionamentos mudam, mas o que temos é inquebrável; você é e sempre será minha melhor amiga.",
  "Porque, independente do formato, eu amo e admiro profundamente a mulher que você se tornou aos 28 anos."
];

// --- LISTA COMPLETA DE 365 MOTIVOS (SEUS MOTIVOS REAIS) ---
const fullReasonsList = [
  "Por você ser a melhor companhia para uma cerveja gelada num dia quente.",
  "Pelo jeito que seus olhos brilham quando vê um animalzinho na rua.",
  "Por você transformar qualquer lugar simples num evento inesquecível.",
  "Pela paciência amorosa que você tem ao ensinar coisas novas para o Théo.",
  "Pelo seu cabelo, que parece ter vida própria e é lindo de qualquer jeito.",
  "Por você nunca ter me deixado desistir dos meus sonhos, mesmo quando eu queria.",
  "Pela sua teimosia, que na verdade é só você não aceitando menos do que merece.",
  "Por você ficar linda até quando está brava.",
  "Pela forma como você se conecta com a natureza e parece recarregar as energias ali.",
  "Por ser uma mulher de 28 anos com a alma de quem quer abraçar o mundo.",
  "Pelo seu sorriso, que é o meu \"bom dia\" preferido (mesmo de longe).",
  "Por você ser a \"enciclopédia\" de animais do Théo.",
  "Pela sua coragem de encarar a faculdade de veterinária com tanta garra.",
  "Por você ser sentimental e me ensinar a não ter vergonha de sentir.",
  "Pelo jeito que você fica animada com um girassol bonito.",
  "Por ser a minha melhor amiga, confidente e parceira há uma década.",
  "Pela segurança que eu sinto em ter você como mãe do meu filho.",
  "Por você topar novas experiências sem medo do desconhecido.",
  "Pela sua \"pequenez\" que cabe no melhor abraço do mundo.",
  "Por você ter me dado o maior presente da minha vida: nossa família.",
  "Pela forma como você defende quem você ama com unhas e dentes.",
  "Por você saber exatamente qual cerveja pedir em cada ocasião.",
  "Pela sua risada, que é contagiante e cura qualquer mau humor.",
  "Por você ser uma sonhadora que não tira os pés do chão para realizar.",
  "Pela admiração que tenho ao te ver estudando até tarde.",
  "Por você ser a pessoa que melhor me conhece no mundo inteiro.",
  "Pela forma carinhosa como você trata até os bichinhos que não são seus.",
  "Por você ser intensa: ou ama muito, ou não ama. Não tem meio termo.",
  "Pela sua honestidade brutal que sempre me coloca no eixo.",
  "Por você ser a Nina. Simplesmente por existir do jeitinho que é.",
  "Pelo orgulho que sinto quando falo de você para as outras pessoas.",
  "Pela forma como você encontra beleza onde ninguém mais vê.",
  "Por você ser como a natureza: às vezes calmaria, às vezes tempestade, mas sempre necessária.",
  "Pelo jeito que você segura o Théo no colo, como se o mundo parasse ali.",
  "Por você nunca recusar um brinde à vida.",
  "Pela sua determinação em terminar a veterinária, custe o que custar.",
  "Por você ficar linda quando está concentrada estudando.",
  "Pelo seu cheiro, que é algo que sempre me traz boas memórias.",
  "Por você ser a \"pequena\" mais brava e protetora que existe.",
  "Pela forma como você me apoia, mesmo quando eu erro.",
  "Por você saber rir de si mesma (uma das suas melhores qualidades).",
  "Pelo brilho que seus olhos ganham quando fala de um novo projeto.",
  "Por você ser a melhor companhia para um show ou festival.",
  "Pela sua capacidade de ouvir sem julgar.",
  "Por você amar girassóis, que são a representação perfeita da sua luz.",
  "Pela forma como você luta para ser uma mulher independente.",
  "Por você me ensinar que ex-marido e ex-mulher podem ser melhores amigos.",
  "Pelo jeito que você arruma o cabelo quando está nervosa.",
  "Por você transformar dias comuns em aventuras para o Théo.",
  "Pela sua voz, que acalma qualquer animalzinho assustado.",
  "Por você ser sentimental e chorar em filmes (e isso é lindo).",
  "Pela sua lealdade inabalável a quem você ama.",
  "Por você ser curiosa e querer sempre aprender mais.",
  "Pelo jeito que você defende suas ideias com paixão.",
  "Por você ser a minha memória viva dos últimos 10 anos.",
  "Pela forma como você se veste, sempre com personalidade.",
  "Por você ser a melhor copiloto em viagens de carro.",
  "Pela sua paciência em me explicar coisas que eu não entendo.",
  "Por você ser a mulher que o nosso filho vai admirar para sempre.",
  "Pela certeza de que você vai ser uma veterinária incrível.",
  "Por você fazer eu me sentir importante na sua vida.",
  "Pelo prazer que você tem no primeiro gole de uma cerveja gelada.",
  "Por você ser a pessoa que eu ligo quando acontece algo bom.",
  "E também a pessoa que eu ligo quando tudo dá errado.",
  "Pela forma como você ensina o Théo a respeitar as mulheres.",
  "Por você ser uma sonhadora que não tem medo de trabalhar duro.",
  "Pelo jeito que você fica animada com flores, não importa a ocasião.",
  "Por você ter me dado uma família, mesmo que num formato diferente.",
  "Pela sua risada alta que preenche a casa.",
  "Por você não ter medo de colocar a mão na massa (ou na terra).",
  "Pela sua estatura, que te faz perfeita para ser protegida no abraço.",
  "Por você ser uma enciclopédia de sentimentos bons.",
  "Pelo jeito que você olha para o horizonte quando estamos na natureza.",
  "Por você nunca deixar o \"brilho\" da maternidade apagar sua identidade de mulher.",
  "Pela sua teimosia em querer que as coisas saiam perfeitas.",
  "Por você ser a prova de que o amor se transforma e evolui.",
  "Pelo jeito carinhoso que você trata meus pais e minha família.",
  "Por você ser a \"tia dos bichos\" onde quer que vá.",
  "Pela sua capacidade de fazer amizades em qualquer lugar.",
  "Por você ser intensa: quando está feliz, transborda.",
  "Pela forma como você organiza a vida do Théo com tanto cuidado.",
  "Por você topar minhas ideias malucas de última hora.",
  "Pelo seu gosto musical que sempre anima o ambiente.",
  "Por você ser a calmaria no meio do meu caos.",
  "Pela sua pele, seu rosto, seus traços únicos.",
  "Por você me incentivar a ser um pai melhor todos os dias.",
  "Pela forma como você valoriza os pequenos gestos.",
  "Por você ser a Nina: autêntica, real e insubstituível.",
  "Pelo jeito que você segura a minha mão quando preciso de apoio.",
  "Por você merecer todas as flores do mundo.",
  "Por você ser a história mais bonita que eu já ajudei a escrever.",
  "Pela sua coragem de recomeçar quantas vezes forem necessárias.",
  "Por você ser a melhor parceira de barzinho do mundo.",
  "Pelo jeito que você conversa com os animais (e eles entendem).",
  "Por você não ter vergonha de ser sentimental.",
  "Pela sua obstinação em dar o melhor futuro para o Théo.",
  "Por você ser linda sem precisar de maquiagem.",
  "E ficar deslumbrante quando resolve se produzir.",
  "Pela sua sabedoria de 28 anos que parece de uma vida inteira.",
  "Por você ser meu porto seguro há uma década.",
  "Pelo jeito que você se emociona com o pôr do sol.",
  "Por você nunca ter deixado nossa amizade esfriar.",
  "Pela sua capacidade de multitarefa: mãe, estudante, mulher, amiga.",
  "Por você ser a crítica mais honesta que eu tenho.",
  "Pelo seu abraço, que cura qualquer tristeza.",
  "Por você amar a liberdade e a natureza.",
  "Pela forma como você respeita o meu espaço e eu o seu.",
  "Por você ser a guardiã das melhores memórias do Théo.",
  "Pelo jeito que você planeja o futuro com otimismo.",
  "Por você ser uma mulher de fibra, que não se deixa abater.",
  "Pela sua paixão por descobrir novos sabores de cerveja.",
  "Por você ser a pessoa mais resiliente que conheço.",
  "Pelo jeito doce que você acorda (na maioria das vezes!).",
  "Por você ser o exemplo de força para o nosso filho.",
  "Pela sua capacidade de perdoar.",
  "Por você ser a \"baixinha\" mais respeitada do pedaço.",
  "Pela sua conexão espiritual com o mundo ao redor.",
  "Por você ser a primeira pessoa que eu quero contar as novidades.",
  "Pelo jeito que seus olhos fecham quando você sorri de verdade.",
  "Por você ser simplesmente apaixonante.",
  "Pela sorte que eu tenho de te ter na minha vida.",
  "Pela dedicação que vejo quando você estuda anatomia até tarde.",
  "Por você não ter nojo de cuidar de animais doentes, só amor.",
  "Pelo jeito que você mistura a ciência com a compaixão.",
  "Por você ser a pessoa que sempre me puxa para cima.",
  "Pela sua vontade de viver novas experiências o tempo todo.",
  "Por você ser a melhor mãe de pet (além de mãe de humano).",
  "Pelo jeito que você fica brava quando vê injustiça com animais.",
  "Por você ser a parceira ideal para brindar as conquistas.",
  "Pela sua risada escandalosa que eu amo.",
  "Por você ser a mulher que me ensinou o que é cumplicidade.",
  "Pelo jeito que você arruma a lancheira do Théo com amor.",
  "Por você ser forte o suficiente para chorar na minha frente.",
  "Pela sua admiração genuína pela natureza.",
  "Por você ser a flor mais bonita do meu jardim de amigos.",
  "Pela sua capacidade de transformar problemas em soluções.",
  "Por você ser a melhor conselheira amorosa (ironicamente ou não).",
  "Pelo jeito que você fica feliz com coisas simples.",
  "Por você ser uma mulher de palavra e caráter.",
  "Pela sua energia contagiante em festas.",
  "Por você me conhecer melhor do que eu mesmo.",
  "Pelo jeito que você cuida da sua saúde e bem-estar.",
  "Por você ser a inspiração para os meus sonhos.",
  "Pela sua habilidade de lidar com crises calmamente.",
  "Por você ser a pessoa mais importante da minha juventude e vida adulta.",
  "Pelo jeito que você ama incondicionalmente.",
  "Por você ser a minha \"pessoa\" no mundo (tipo Grey's Anatomy).",
  "Pela sua voz quando canta (mesmo que erre a letra).",
  "Por você ser a Nina, única e insubstituível.",
  "Pela certeza de que estaremos juntos na formatura do Théo.",
  "Por você ser o amor em forma de amizade.",
  "Pela forma como chegamos até aqui, juntos e fortes.",
  "Por você nunca desistir de nós (como amigos e pais).",
  "Pelo jeito que você me olha e eu sei exatamente o que pensa.",
  "Por você ser a mulher mais interessante que conheço.",
  "Pela sua paixão por girassóis, que reflete sua alma solar.",
  "Por você ser a melhor companhia para um domingo de preguiça.",
  "Pelo jeito que você educa o Théo com firmeza e doçura.",
  "Por você ter me dado os melhores 10 anos da minha vida.",
  "Pela sua coragem de mudar de opinião e evoluir.",
  "Por você ser a veterinária que o mundo precisa.",
  "Pela sua sensibilidade em perceber quando não estou bem.",
  "Por você ser a alegria da casa, onde quer que estejamos.",
  "Pelo jeito que você saboreia a vida (e a cerveja).",
  "Por você ser a mulher que me fez crescer.",
  "Pela sua insistência em fazer o certo, mesmo sendo difícil.",
  "Por você ser linda de alma e de corpo.",
  "Pelo jeito que você conta histórias e me faz rir.",
  "Por você ser a melhor parceira de crimes (no bom sentido).",
  "Pela sua conexão com tudo que é vivo e verde.",
  "Por você ser a minha prioridade de cuidado e afeto.",
  "Pelo jeito que você me defende para os outros.",
  "Por você ser a mãe que eu sempre sonhei para meu filho.",
  "Pela sua capacidade de amar, que é infinita.",
  "Por você ser a luz no fim do túnel em dias ruins.",
  "Pelo jeito que você se entrega a tudo que faz.",
  "Por você ser a minha melhor amiga, hoje e sempre.",
  "Pela sua obstinação que me inspira a não desistir.",
  "Por você ser o girassol da minha vida.",
  "Pela gratidão eterna que tenho por você existir.",
  "Por você ser simplesmente VOCÊ.",
  "Pela forma como você consegue ser intensa e leve ao mesmo tempo.",
  "Por você ser a minha crítica gastronômica (e de cerveja) favorita.",
  "Pelo jeito que você protege os animais indefesos na rua.",
  "Por você ser a \"baixinha\" mais brava e linda que eu conheço.",
  "Pela sua capacidade de transformar dias cinzas em dias de sol.",
  "Por você ser a mãe que rola no chão para brincar com o Théo.",
  "Pelo brilho nos seus olhos quando fala dos seus planos futuros.",
  "Por você ser a mulher que nunca me deixou na mão.",
  "Pela sua teimosia que sempre te leva a lugares incríveis.",
  "Por você ser a prova de que almas gêmeas podem ser amigas.",
  "Pelo jeito que você fica linda com o cabelo bagunçado.",
  "Por você ser a minha bússola quando estou perdido.",
  "Pela sua paixão por descobrir lugares novos.",
  "Por você ser a veterinária mais doce que esse mundo vai ter.",
  "Pelo jeito que você me escuta, mesmo quando falo besteira.",
  "Por você ser a flor mais resistente do jardim.",
  "Pela sua risada que faz qualquer um rir junto.",
  "Por você ser a guardiã da nossa história.",
  "Pelo jeito que você ama o nosso filho acima de tudo.",
  "Por você ser a mulher que me ensinou a ser homem.",
  "Pela sua coragem de dizer \"não\" quando necessário.",
  "Por você ser a melhor companhia para um show de rock ou pagode.",
  "Pelo seu cheiro que fica no ar e traz paz.",
  "Por você ser sonhadora, mas com os pés no chão para realizar.",
  "Pela sua força que me inspira todos os dias.",
  "Por você ser a Nina, sem tirar nem pôr.",
  "Pelo jeito que você celebra as pequenas vitórias.",
  "Por você ser a minha família, não importa o rótulo.",
  "Pela certeza de que você estará lá no meu futuro.",
  "Por você ser o meu \"felizes para sempre\" de um jeito diferente.",
  "Pela forma como você encara os desafios da faculdade.",
  "Por você ser a pessoa que me acalma com um olhar.",
  "Pelo jeito que você segura a minha mão em momentos difíceis.",
  "Por você ser a mulher mais autêntica que já conheci.",
  "Pela sua paixão contagiante pela vida.",
  "Por você ser a melhor motorista da rodada (quando precisa).",
  "Pelo jeito que você me defende, mesmo quando não estou perto.",
  "Por você ser a mãe que ensina o Théo a ser gentil.",
  "Pela sua capacidade de se reinventar a cada dia.",
  "Por você ser a minha confidente número 1.",
  "Pelo jeito que você fica feliz com um simples girassol.",
  "Por você ser a mulher que dá cor aos meus dias.",
  "Pela sua honestidade que, às vezes, dói, mas cura.",
  "Por você ser a melhor parceira de dança (mesmo improvisada).",
  "Pelo seu sorriso que ilumina qualquer escuridão.",
  "Por você ser a veterinária que vai salvar muitas vidas.",
  "Pela sua sensibilidade em perceber o que não foi dito.",
  "Por você ser a mulher que eu mais admiro no mundo.",
  "Pelo jeito que você ama a liberdade.",
  "Por você ser a minha melhor memória e meu melhor presente.",
  "Pela sua força diante das adversidades.",
  "Por você ser a pessoa que me conhece pelo avesso.",
  "Pelo jeito que você cuida de mim, mesmo de longe.",
  "Por você ser a Nina, única e inigualável.",
  "Pela sua risada ser a trilha sonora da minha vida.",
  "Por você ser a mulher que faz a diferença.",
  "Pelo jeito que você abraça o mundo (e as árvores).",
  "Por você ser a minha âncora e minha vela.",
  "Pela gratidão de ter você por perto.",
  "Por você ser simplesmente extraordinária.",
  "Pela história linda que construímos em 10 anos.",
  "Por você ser a mãe que eu sempre quis para o meu filho.",
  "Pelo jeito que você me inspira a ser melhor.",
  "Por você ser a mulher mais bonita, por dentro e por fora.",
  "Pela sua dedicação aos estudos, que é admirável.",
  "Por você ser a melhor companhia para um café ou cerveja.",
  "Pelo jeito que você ama a natureza e os animais.",
  "Por você ser a minha paz em dias de guerra.",
  "Pela sua capacidade de amar sem medidas.",
  "Por você ser a mulher que sabe o que quer.",
  "Pelo seu sorriso, que é o cartão postal da felicidade.",
  "Por você ser a minha melhor amiga, ontem, hoje e sempre.",
  "Pela sua obstinação em realizar seus sonhos.",
  "Por você ser a pessoa que me entende sem palavras.",
  "Pelo jeito que você valoriza a nossa amizade.",
  "Por você ser a mulher que me ensinou o significado de lealdade.",
  "Pela sua sensibilidade que toca a alma.",
  "Por você ser a luz que guia o Théo.",
  "Pelo jeito que você fica linda quando está feliz.",
  "Por você ser a veterinária que vai mudar o mundo.",
  "Pela sua coragem de ser quem você é.",
  "Por você ser a minha parceira de vida.",
  "Pelo jeito que você me apoia incondicionalmente.",
  "Por você ser a mulher que merece todo o amor do mundo.",
  "Pela sua força que me sustenta.",
  "Por você ser a Nina, a minha Nina.",
  "Pelo jeito que você faz tudo valer a pena.",
  "Por você ser a melhor parte do meu passado e presente.",
  "Pela certeza de que nossa amizade é eterna.",
  "Por você ser o meu lar.",
  "Pela forma como você não desiste nunca de um animal doente.",
  "Por você ser a personificação da palavra \"resiliência\".",
  "Pelo jeito que você fica charmosa quando usa óculos (se usar) ou franze a testa.",
  "Por você ser a mulher que me ensinou a ter empatia.",
  "Pela sua paixão por viver intensamente cada segundo.",
  "Por você ser a melhor ouvinte para os meus desabafos.",
  "Pelo jeito que você cuida do seu jardim (real e metafórico).",
  "Por você ser a mãe que cria memórias mágicas.",
  "Pela sua beleza natural que dispensa filtros.",
  "Por você ser a companhia que nunca cansa.",
  "Pelo jeito que você brinda a vida com entusiasmo.",
  "Por você ser a mulher que desafia as estatísticas.",
  "Pela sua inteligência emocional que me surpreende.",
  "Por você ser a minha rocha sólida.",
  "Pelo jeito que você ama o simples e o belo.",
  "Por você ser a veterinária que trata com a alma.",
  "Pela sua risada que espanta qualquer mal.",
  "Por você ser a mulher que eu quero ver vencer sempre.",
  "Pelo jeito que você me respeita e me valoriza.",
  "Por você ser a minha dupla dinâmica.",
  "Pela sua capacidade de sonhar alto e voar.",
  "Por você ser a melhor mãe do mundo para o Théo.",
  "Pelo jeito que você me olha com carinho.",
  "Por você ser a mulher que não tem medo de errar.",
  "Pela sua essência que é pura luz.",
  "Por você ser a minha certeza em um mundo de dúvidas.",
  "Pelo jeito que você me faz sentir em casa.",
  "Por você ser a Nina, a única.",
  "Pela gratidão de dividir a vida com você.",
  "Por você ser o meu milagre diário.",
  "Pela sua generosidade em compartilhar a vida comigo.",
  "Por você ser a mulher que me inspira a não desistir.",
  "Pelo jeito que você ama os detalhes da natureza.",
  "Por você ser a minha melhor escolha de amizade.",
  "Pela sua força que move montanhas.",
  "Por você ser a mãe que educa pelo exemplo.",
  "Pelo jeito que você sorri com os olhos.",
  "Por você ser a mulher que transforma o mundo.",
  "Pela sua paixão pela veterinária que emociona.",
  "Por você ser a minha cúmplice em tudo.",
  "Pelo jeito que você me aceita como sou.",
  "Por você ser a luz nos dias nublados.",
  "Pela sua capacidade de amar sem pedir nada em troca.",
  "Por você ser a mulher mais incrível que conheço.",
  "Pelo jeito que você celebra a minha felicidade.",
  "Por você ser a minha parceira de jornada.",
  "Pela sua sabedoria que vai além da idade.",
  "Por você ser a mãe leoa que protege a cria.",
  "Pelo jeito que você torna tudo mais leve.",
  "Por você ser a mulher que eu admiro profundamente.",
  "Pela sua beleza que vem de dentro para fora.",
  "Por você ser a minha melhor história.",
  "Pelo jeito que você me faz rir até doer a barriga.",
  "Por você ser a veterinária que vai fazer história.",
  "Pela sua sensibilidade que é um dom.",
  "Por você ser a mulher que eu quero ter por perto para sempre.",
  "Pelo jeito que você me completa como amigo.",
  "Por você ser a Nina, simplesmente maravilhosa.",
  "Pela sorte de ter te encontrado nessa vida.",
  "Por você ser a mulher que dá sentido à palavra \"mãe\".",
  "Pelo jeito que você me ensinou a amar a natureza.",
  "Por você ser a minha melhor amiga, hoje e sempre.",
  "Pela sua obstinação que é a sua maior força.",
  "Por você ser a sonhadora que realiza.",
  "Pelo jeito que você fica linda cercada de flores.",
  "Por você ser a mulher que eu idolatro.",
  "Pela sua capacidade de ser forte e doce.",
  "Por você ser a veterinária dos meus animais e do meu coração.",
  "Pelo jeito que você me faz sentir especial.",
  "Por você ser a luz que nunca se apaga.",
  "Pela sua lealdade que é rara.",
  "Por você ser a mulher que merece o mundo.",
  "Pelo jeito que você ama o nosso filho.",
  "Por você ser a minha companheira de vida.",
  "Pela sua essência que é pura magia.",
  "Por você ser a melhor parte de mim.",
  "Pelo jeito que você me inspira a ser grande.",
  "Por você ser a mulher da minha vida (de um jeito único).",
  "Pela sua amizade que vale mais que ouro.",
  "Por você ser a Nina que eu amo e admiro.",
  "Pelo jeito que você faz a diferença no mundo.",
  "Por você ser a minha eterna namorada (amiga).",
  "Pela sua beleza que não tem fim.",
  "Por você ser a mãe perfeita para o Théo.",
  "Pelo jeito que você me toca a alma.",
  "Por você ser a mulher mais forte do universo.",
  "Pela sua capacidade de amar infinitamente.",
  "Por você ser o meu porto seguro eterno.",
  "Pelo jeito que você ilumina a minha vida há 10 anos.",
  "Por você ser a melhor pessoa que eu conheço.",
  "Pela certeza de que estaremos juntos até o fim.",
  "Por você ser o amor da minha vida, transformado em amizade eterna.",
  "Pela gratidão imensa, infinita e eterna de ter vivido tudo isso com você.",
  "Porque, depois de 365 motivos, a única conclusão é que eu te amo, te admiro e estarei sempre aqui por você, Nina."
];

// Gerar lista com IDs
const generateReasons = () => {
  return fullReasonsList.map((text, index) => ({
    id: index + 1,
    text: text
  }));
};

const reasonsList = generateReasons();
const TOTAL_REASONS = reasonsList.length;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [view, setView] = useState('intro'); // 'intro', 'golden', 'main'
  const [openedCards, setOpenedCards] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null);
  const [goldenRevealed, setGoldenRevealed] = useState([]); // Array de índices revelados nos golden cards

  // Verificar se já está autenticado (cache simples local)
  useEffect(() => {
    const cachedPass = localStorage.getItem('365_passcode');
    if (cachedPass) {
      setPasscode(cachedPass);
      handleLogin(cachedPass);
    }
  }, []);

  const handleLogin = async (codeToUse) => {
    const code = codeToUse || passcode;
    if (!code) return;

    setLoading(true);
    setLoginError('');

    try {
      // Tentar buscar o usuário pelo passcode
      let { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', code)
        .single();

      if (error && error.code !== 'PGRST116') {
        // Erro real (diferente de "não encontrado")
        throw error;
      }

      if (!data) {
        // Usuário não existe, criar um novo
        const { data: newData, error: createError } = await supabase
          .from('user_progress')
          .insert([
            { id: code, opened_cards: [], golden_revealed: [] }
          ])
          .select()
          .single();

        if (createError) throw createError;
        data = newData;
      }

      // Sucesso! Carregar dados
      setOpenedCards(data.opened_cards || []);
      setGoldenRevealed(data.golden_revealed || []);
      setIsAuthenticated(true);
      localStorage.setItem('365_passcode', code); // Manter logado neste dispositivo
    } catch (err) {
      console.error('Erro no login:', err);
      setLoginError('Não foi possível conectar. Verifique sua senha ou conexão.');
    } finally {
      setLoading(false);
    }
  };

  // Salvar progresso no Supabase quando mudar
  const saveProgress = async (newOpenedCards, newGoldenRevealed) => {
    // Atualiza estado local
    if (newOpenedCards) setOpenedCards(newOpenedCards);
    if (newGoldenRevealed) setGoldenRevealed(newGoldenRevealed);

    // Atualiza no Supabase
    try {
      await supabase
        .from('user_progress')
        .upsert({
          id: passcode,
          opened_cards: newOpenedCards || openedCards,
          golden_revealed: newGoldenRevealed || goldenRevealed
        });
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const handleCardClick = (reason) => {
    setSelectedReason(reason);
    if (!openedCards.includes(reason.id)) {
      const newOpened = [...openedCards, reason.id];
      saveProgress(newOpened, null);
    }
  };

  const closeModal = () => {
    setSelectedReason(null);
  };

  const handleGoldenClick = (index) => {
    if (!goldenRevealed.includes(index)) {
      const newRevealed = [...goldenRevealed, index];
      saveProgress(null, newRevealed);
    }
  };

  const progressPercentage = (openedCards.length / TOTAL_REASONS) * 100;

  // --- TELA DE LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <div className="mx-auto bg-pink-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
            <Lock className="text-pink-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-handwriting">Acesso Secreto</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Digite a senha especial para acessar seus 365 motivos.
          </p>

          <input
            type="text"
            placeholder="Senha do casal..."
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition mb-4 text-center text-lg"
          />

          {loginError && (
            <p className="text-red-500 text-xs mb-4">{loginError}</p>
          )}

          <button
            onClick={() => handleLogin()}
            disabled={loading || !passcode}
            className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Entrar'}
          </button>
        </div>
      </div>
    );
  }

  // --- COMPONENTE DO POTE (JAR) ---
  const JarIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center animate-in fade-in duration-1000">
      <h1 className="text-4xl sm:text-5xl font-handwriting font-bold text-pink-600 mb-8 drop-shadow-sm">
        Para a pessoa que mais Admiro
      </h1>

      {/* O Pote SVG interativo */}
      <div
        className="relative group cursor-pointer transition-transform duration-500 hover:scale-105"
        onClick={() => setView('golden')}
      >
        {/* Vidro do Pote */}
        <svg width="240" height="320" viewBox="0 0 240 320" className="drop-shadow-2xl">
          {/* Corpo do Pote */}
          <path
            d="M 40 60 Q 30 60 30 80 L 30 280 Q 30 310 60 310 L 180 310 Q 210 310 210 280 L 210 80 Q 210 60 200 60 Z"
            fill="rgba(255, 255, 255, 0.3)"
            stroke="#fbcfe8"
            strokeWidth="4"
          />
          {/* Tampa */}
          <rect x="35" y="30" width="170" height="30" rx="5" fill="#f472b6" stroke="#db2777" strokeWidth="2" />

          {/* Brilhos no vidro */}
          <path d="M 50 100 Q 40 150 50 200" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />

          {/* Corações dentro (Estáticos e animados) */}
          <g className="animate-pulse">
            <path d="M 80 250 L 90 240 L 100 250 L 90 260 Z" fill="#fecdd3" /> {/* Simplificado */}
            <text x="80" y="280" fill="#db2777" fontSize="24">❤️</text>
            <text x="120" y="250" fill="#be185d" fontSize="30">❤️</text>
            <text x="60" y="200" fill="#db2777" fontSize="20">❤️</text>
            <text x="150" y="220" fill="#ec4899" fontSize="28">❤️</text>
            <text x="100" y="150" fill="#f472b6" fontSize="22">❤️</text>
            <text x="160" y="180" fill="#be185d" fontSize="25">❤️</text>
          </g>

          {/* Rótulo */}
          <rect x="60" y="120" width="120" height="60" rx="2" fill="#fff1f2" stroke="#fbcfe8" />
          <text x="120" y="155" textAnchor="middle" fontFamily="cursive" fontSize="22" fill="#db2777">
            Meus
          </text>
          <text x="120" y="175" textAnchor="middle" fontFamily="cursive" fontSize="14" fill="#db2777">
            Motivos
          </text>
        </svg>

        {/* Efeito de "Clique em mim" */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-max">
          <span className="bg-white/80 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold shadow-sm animate-bounce">
            Clique para abrir ✨
          </span>
        </div>
      </div>
    </div>
  );

  // --- TELA DOS 10 MOTIVOS DE OURO ---
  const GoldenReasonsView = () => (
    <div className="min-h-screen p-6 flex flex-col items-center animate-in zoom-in-95 duration-700">
      <h2 className="text-3xl font-handwriting font-bold text-yellow-600 mb-2 flex items-center gap-2">
        <Star className="fill-yellow-400 text-yellow-500" />
        10 Motivos de Ouro
        <Star className="fill-yellow-400 text-yellow-500" />
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-md">
        Antes de ver todos os dias do ano, separei estes 10 motivos especiais que resumem tudo o que sinto por você.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mb-12">
        {goldenReasonsList.map((text, index) => {
          const isRevealed = goldenRevealed.includes(index);
          return (
            <div
              key={index}
              onClick={() => handleGoldenClick(index)}
              className={`
                relative h-24 sm:h-32 rounded-xl shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-[1.02]
                perspective-1000
              `}
            >
              <div className={`
                w-full h-full absolute inset-0 rounded-xl flex items-center justify-center p-4 text-center border-2
                transition-all duration-700 backface-hidden
                ${isRevealed
                  ? 'bg-white border-yellow-300 text-gray-800 rotate-0'
                  : 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 border-yellow-200 text-white shadow-yellow-200/50'
                }
              `}>
                {isRevealed ? (
                  <p className="font-handwriting text-lg sm:text-xl font-medium leading-tight">{text}</p>
                ) : (
                  <div className="flex flex-col items-center">
                    <Star className="w-8 h-8 text-white fill-white mb-1 animate-spin-slow" />
                    <span className="font-bold text-sm tracking-widest uppercase text-yellow-50">Toque para revelar</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Botão para ir para o app principal */}
      <div className={`transition-all duration-1000 ${goldenRevealed.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button
          onClick={() => setView('main')}
          className="group bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-xl transition transform hover:scale-105 flex items-center gap-3"
        >
          <span>Ver os 365 Motivos</span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  // --- RENDERIZAÇÃO CONDICIONAL ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 font-sans text-gray-800 selection:bg-pink-200 flex flex-col">

      {/* 1. TELA INTRO - POTE */}
      {view === 'intro' && <JarIntro />}

      {/* 2. TELA GOLDEN */}
      {view === 'golden' && <GoldenReasonsView />}

      {/* 3. TELA PRINCIPAL (GRID 365) */}
      {view === 'main' && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 flex flex-col min-h-screen">
          {/* Header Fixo */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="text-red-500 w-6 h-6 fill-red-500" />
                <span className="font-bold text-lg text-gray-800 hidden sm:inline">365 Motivos</span>
                <span className="font-bold text-lg text-gray-800 sm:hidden">365</span>

                {/* Botão Sair */}
                <button
                  onClick={() => {
                    localStorage.removeItem('365_passcode');
                    setIsAuthenticated(false);
                    setPasscode('');
                  }}
                  className="ml-2 text-xs text-pink-400 underline"
                >
                  Sair
                </button>
              </div>

              <div className="flex flex-col items-end w-2/3 sm:w-1/3">
                <div className="flex justify-between w-full text-xs text-pink-600 font-semibold mb-1">
                  <span>{openedCards.length} abertos</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-pink-100 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-red-400 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </header>

          {/* Grid de Cards */}
          <main className="flex-grow max-w-[1600px] mx-auto p-2 sm:p-6 pb-20 w-full">
            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-1.5 sm:gap-3">
              {reasonsList.map((reason) => {
                const isOpened = openedCards.includes(reason.id);
                return (
                  <button
                    key={reason.id}
                    onClick={() => handleCardClick(reason)}
                    className={`
                      relative aspect-square rounded-lg shadow-sm border flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95
                      ${isOpened
                        ? 'bg-white border-pink-200 text-pink-300'
                        : 'bg-gradient-to-br from-red-400 to-pink-500 border-transparent text-white shadow-pink-200/50 hover:shadow-md'
                      }
                    `}
                  >
                    {isOpened ? (
                      <span className="font-bold text-xs sm:text-sm opacity-40">{reason.id}</span>
                    ) : (
                      <Heart className={`w-3 h-3 sm:w-4 sm:h-4 opacity-90`} fill="currentColor" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mensagem Final */}
            {openedCards.length === TOTAL_REASONS && (
              <div className="mt-12 text-center p-8 bg-white/60 backdrop-blur rounded-3xl border border-pink-100 animate-in slide-in-from-bottom duration-700 shadow-xl max-w-2xl mx-auto">
                <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-spin-slow" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Um ano inteiro de amor!</h2>
                <p className="text-lg text-gray-600">
                  Você completou os 365 motivos. <br />
                  Obrigado por fazer cada dia do meu ano mais feliz.
                </p>
                <div className="mt-4 text-4xl">❤️</div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Modal de Leitura (Comum para o Grid Principal) */}
      {selectedReason && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-red-400 to-pink-500 p-4 flex justify-between items-center">
              <span className="text-white font-bold opacity-90 uppercase tracking-wider text-xs sm:text-sm">
                DIA {selectedReason.id} DE 365
              </span>
              <button
                onClick={closeModal}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[200px]">
              <p className="text-xl sm:text-3xl font-handwriting font-medium text-gray-800 leading-relaxed">
                "{selectedReason.text}"
              </p>
              <div className="mt-6">
                <Heart className="text-pink-400 w-6 h-6 fill-pink-100" />
              </div>
            </div>

            <div className="bg-gray-50 p-4 text-center border-t border-gray-100 cursor-pointer hover:bg-gray-100 transition" onClick={closeModal}>
              <span className="text-gray-500 text-xs sm:text-sm font-medium">
                Toque para fechar
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Estilos Globais */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Inter:wght@400;600&display=swap');
        .font-handwriting {
          font-family: 'Dancing Script', cursive, sans-serif;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}