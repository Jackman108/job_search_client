import {i18next} from '@config';
import {I18nextProvider} from 'react-i18next';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider, SearchFormProvider, VacancyProvider} from "@app/providers/index";
import {AppProvidersProps} from "@app/types/AppProviders.props";


const AppProviders = ({children}: AppProvidersProps) => {
    return (
        <I18nextProvider i18n={i18next}>
            <AuthProvider>
                <SearchFormProvider>
                    <VacancyProvider>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </VacancyProvider>
                </SearchFormProvider>
            </AuthProvider>
        </I18nextProvider>
    );
};

export default AppProviders;