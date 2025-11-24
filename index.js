const { Alice, Scene, Stage, Reply } = require('yandex-dialogs-sdk');

const alice = new Alice();
const stage = new Stage();

const SCENE_ASK_TITLE = 'askTitle';
const SCENE_ASK_DEADLINE = 'askDeadline';

const askTitle = new Scene(SCENE_ASK_TITLE);
const askDeadline = new Scene(SCENE_ASK_DEADLINE);

// Матчер для приветствия (первый запрос к навыку)
const welcomeMatcher = (ctx) => ctx.data.session.new === true;

// "Добро пожаловать"
alice.command(welcomeMatcher, (ctx) => {
    ctx.enter(SCENE_ASK_TITLE);
    return Reply.text('Какое название задачи?');
});

// ----- SCENE: askTitle -----
askTitle.any((ctx) => {
    // ctx.message — это shortcut к ctx.data.request.command :contentReference[oaicite:1]{index=1}
    ctx.session.set('title', ctx.message);
    ctx.enter(SCENE_ASK_DEADLINE);
    return Reply.text('Когда нужно выполнить эту задачу?');
});

// ----- SCENE: askDeadline -----
askDeadline.any((ctx) => {
    const title = ctx.session.get('title');
    const deadline = ctx.message;

    // TODO: твой API вызов здесь

    ctx.leave();
    return Reply.text(`Создаю задачу "${title}" на ${deadline}`);
});

// Регистрируем сцены и подключаем stage
stage.addScene(askTitle);
stage.addScene(askDeadline);
alice.use(stage.getMiddleware());

// Фолбэк, если ничего не сматчилось
alice.any((ctx) => Reply.text('Я пока умею только создавать задачи: скажи «создай задачу».'));

// Запуск сервера
alice.listen(3000, '/');
