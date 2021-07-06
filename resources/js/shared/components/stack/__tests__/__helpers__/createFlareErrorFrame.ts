import { ErrorFrame } from 'resources/js/shared/types';

export default function createFlareErrorFrame(attributes: Partial<ErrorFrame>): ErrorFrame {
    return {
        file: '/Users/sebastiandedeyne/Sites/flareapp.io/database/faker/ExceptionProvider.php',
        relative_file: 'database/faker/ExceptionProvider.php',
        line_number: 35,
        class: 'ExceptionProvider',
        method: 'exception',
        code_snippet: {
            '35': '        return Stacktrace::createForThrowable($this->exception())->toArray();',
        },
        ...attributes,
    };
}
