import { i18next } from '@config';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, HhJobProvider, SearchFormProvider, VacancyProvider } from '@app/providers/index';
import { AppProvidersProps } from '@app/types/AppProviders.props';

const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <I18nextProvider i18n={i18next}>
            <AuthProvider>
                <HhJobProvider>
                    <SearchFormProvider>
                        <VacancyProvider>
                            <BrowserRouter>{children}</BrowserRouter>
                        </VacancyProvider>
                    </SearchFormProvider>
                </HhJobProvider>
            </AuthProvider>
        </I18nextProvider>
    );
};

export default AppProviders;
