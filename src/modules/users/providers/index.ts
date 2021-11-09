import { container } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// container.registerSingleton<IMailProvider>('MailProvider');

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
