export const DI_TYPES = {
    UserRepository: Symbol.for('UserRepository'),
    AuthService: Symbol.for('AuthService'),
    AuthController: Symbol.for('AuthController'),

    SnippetRepository: Symbol.for('SnippetRepository'),
    SnippetService: Symbol.for('SnippetService'),
    SnippetController: Symbol.for('SnippetController'),
}