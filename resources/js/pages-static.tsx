import { createRoot } from 'react-dom/client';
import type { ComponentProps } from 'react';
import Welcome from './pages/welcome';
import '../../pages/reset.css';

declare const __BIRTHDAY_EVENT__: ComponentProps<typeof Welcome>['eventData'];

createRoot(document.getElementById('root')!).render(
    <Welcome eventData={__BIRTHDAY_EVENT__} staticPage />,
);
