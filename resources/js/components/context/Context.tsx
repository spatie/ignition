import {
    faAsterisk,
    faBomb,
    faCode,
    faCodeBranch,
    faCookieBite,
    faExchangeAlt,
    faFile,
    faHourglassHalf,
    faLayerGroup,
    faLightbulb,
    faPaintRoller,
    faQuestionCircle,
    faRandom,
    faSlidersH,
    faTerminal,
    faUser,
    faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Command from "components/context/sections/Command";
import Custom from "components/context/sections/Custom";
import LiveWireIcon from 'components/ui/icons/LivewireIcon';
import startCase from 'lodash/startCase';
import React, { useContext } from 'react';
import urlSlug from 'url-slug';
import InViewContextProvider from '../../contexts/InViewContextProvider';
import ErrorBoundary from '../ui/ErrorBoundary';
import ContextGroup from './ContextGroup';
import ContextSection from './ContextSection';
import ContextSections from './ContextSections';
import ErrorOccurrenceContext from './ErrorOccurrenceContext';
import Body from './sections/Body';
import Browser from "./sections/Browser";
import Cookies from './sections/Cookies';
import Files from './sections/Files';
import Git from './sections/Git';
import Headers from './sections/Headers';
import LivewireCalls from './sections/LivewireCalls';
import LivewireComponent from './sections/LivewireComponent';
import LivewireData from './sections/LivewireData';
import LivewireMemo from './sections/LivewireMemo';
import LivewireUpdates from './sections/LivewireUpdates';
import QueryString from './sections/QueryString';
import Request from './sections/Request';
import Routing from './sections/Routing';
import Session from './sections/Session';
import User from './sections/User';
import Versions from './sections/Versions';
import View from './sections/View';

export default function Context() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const context = errorOccurrence.context_items;
    const requestData = context.request_data;

    return (
        <ErrorBoundary>
            <div className="@container flex items-stretch">
                <InViewContextProvider>
                    <ContextSections>
                        {(context.route || context.view || context.laravel_context || context.arguments || context.job) && (
                            <ContextGroup title="App" anchor="app">
                                {context.route && (
                                    <ContextSection
                                        title="Routing"
                                        anchor="app-routing"
                                        icon={<FontAwesomeIcon fixedWidth icon={faRandom}/>}
                                        children={<Routing route={context.route}/>}
                                    />
                                )}
                                {context.view && (
                                    <ContextSection
                                        title="Views"
                                        anchor="app-views"
                                        icon={<FontAwesomeIcon fixedWidth icon={faPaintRoller}/>}
                                        children={<View/>}
                                    />
                                )}
                                {context.laravel_context && (
                                    <ContextSection
                                        title="Context"
                                        anchor="app-laravel-context"
                                        icon={<FontAwesomeIcon fixedWidth icon={faLightbulb}/>}
                                        children={<Custom items={context.laravel_context}/>}
                                    />
                                )}
                                {context.arguments && (
                                    <ContextSection
                                        title="Command"
                                        anchor="context-command"
                                        icon={<FontAwesomeIcon fixedWidth icon={faTerminal}/>}
                                        children={<Command commandArguments={context.arguments}/>}
                                    />
                                )}
                                {context.job && (
                                    <ContextSection
                                        title="Job"
                                        anchor="context-job"
                                        icon={<FontAwesomeIcon fixedWidth icon={faLayerGroup}/>}
                                        children={<Custom items={context.job || {}}/>}
                                    />
                                )}
                            </ContextGroup>
                        )}
                        {context.request && (
                            <ContextGroup title="Request" anchor="request">
                                <Request
                                    request={context.request}
                                    requestData={context.request_data}
                                    headers={context.headers}
                                />
                                {!!context.request.useragent && (
                                    <ContextSection
                                        title="Browser"
                                        anchor="request-browser"
                                        icon={<FontAwesomeIcon fixedWidth icon={faWindowMaximize}/>}
                                        children={<Browser
                                            request={context.request}
                                        />}
                                    />
                                )}
                                {context.headers && (
                                    <ContextSection
                                        title="Headers"
                                        anchor="request-headers"
                                        icon={<FontAwesomeIcon fixedWidth icon={faExchangeAlt}/>}
                                        children={<Headers headers={context.headers}/>}
                                    />
                                )}
                                {context.request_data && !!Object.values(context.request_data.queryString || []).length && (
                                    <ContextSection
                                        title="Query String"
                                        anchor="request-query-string"
                                        icon={<FontAwesomeIcon fixedWidth icon={faQuestionCircle}/>}
                                        children={<QueryString requestData={context.request_data}/>}
                                    />
                                )}
                                {!!context.request_data?.body && (
                                    <ContextSection
                                        title="Body"
                                        anchor="request-body"
                                        icon={<FontAwesomeIcon fixedWidth icon={faCode}/>}
                                        children={<Body/>}
                                    />
                                )}
                                {!!requestData?.files?.length && (
                                    <ContextSection
                                        title="Files"
                                        anchor="request-files"
                                        icon={<FontAwesomeIcon fixedWidth icon={faFile}/>}
                                        children={<Files/>}
                                    />
                                )}
                                {!!context.session?.length && (
                                    <ContextSection
                                        title="Session"
                                        anchor="request-session"
                                        icon={<FontAwesomeIcon fixedWidth icon={faHourglassHalf}/>}
                                        children={<Session session={context.session}/>}
                                    />
                                )}
                                {!!context.cookies?.length && (
                                    <ContextSection
                                        title="Cookies"
                                        anchor="request-cookies"
                                        icon={<FontAwesomeIcon fixedWidth icon={faCookieBite}/>}
                                        children={<Cookies cookies={context.cookies}/>}
                                    />
                                )}
                            </ContextGroup>
                        )}
                        {context.livewire && context.livewire.length > 0 && (
                            <ContextGroup title="Livewire" anchor="livewire">
                                {context.livewire.map((component) => (
                                    <ContextSection
                                        key={(component.memo?.name ?? component.component_alias) + ''}
                                        title={(component.memo?.name ?? component.component_alias) + '' ?? 'Component'}
                                        anchor={(component.memo?.name ?? component.component_alias) + "-request-livewire"}
                                        icon={<LiveWireIcon className="svg-inline--fa fa-w-16 fa-fw"/>}
                                    >
                                        <div className="mt-3 grid grid-cols-1 gap-10">
                                            <ContextSection
                                                title="Component"
                                                anchor={(component.memo?.name ?? component.component_alias) + "-livewire-component"}
                                                secondaryTitle={true}
                                                children={<LivewireComponent component={component} />}
                                            />
                                            {component.updates.length > 0 && (
                                                <ContextSection
                                                    title="Updates"
                                                    anchor={(component.memo?.name ?? component.component_alias) + "-livewire-updates"}
                                                    secondaryTitle={true}
                                                    children={<LivewireUpdates component={component} />}
                                                />
                                            )}
                                            {!!(component.calls && component.calls.length > 0) && (
                                                <ContextSection
                                                    title="Calls"
                                                    anchor={(component.memo?.name ?? component.component_alias) + "-livewire-updates"}
                                                    secondaryTitle={true}
                                                    children={<LivewireCalls component={component} />}
                                                />
                                            )}
                                            <ContextSection
                                                title="Data"
                                                anchor={(component.memo?.name ?? component.component_alias) + "-livewire-data"}
                                                secondaryTitle={true}
                                                children={<LivewireData component={component} />}
                                            />
                                            {(component.memo) && <ContextSection
                                                title="Memo"
                                                anchor={(component.memo?.name ?? component.component_alias) + '-livewire-memo'}
                                                secondaryTitle={true}
                                                children={<LivewireMemo component={component} />}
                                            />}
                                        </div>
                                    </ContextSection>
                                ))}
                            </ContextGroup>
                        )}
                        {!!(context.user || context.git || context.env || errorOccurrence.application_version || context.exception) && (
                            <ContextGroup title="Context" anchor="context">
                                {context.user && (
                                    <ContextSection
                                        title="User"
                                        anchor="user-user"
                                        icon={<FontAwesomeIcon fixedWidth icon={faUser}/>}
                                        children={<User user={context.user}/>}
                                    />
                                )}
                                {context.git && (
                                    <ContextSection
                                        title="Git"
                                        anchor="context-git"
                                        icon={<FontAwesomeIcon fixedWidth icon={faCodeBranch}/>}
                                        children={<Git git={context.git}/>}
                                    />
                                )}
                                {!!(context.env || errorOccurrence.application_version) && (
                                    <ContextSection
                                        title="Versions"
                                        anchor="context-versions"
                                        icon={<FontAwesomeIcon fixedWidth icon={faSlidersH}/>}
                                        children={<Versions env={context.env || {}}/>}
                                    />
                                )}
                                {context.exception && (
                                    <ContextSection
                                        title="Exception"
                                        anchor="context-exception"
                                        icon={<FontAwesomeIcon fixedWidth icon={faBomb}/>}
                                        children={<Custom items={context.exception || {}}/>}
                                    />
                                )}
                            </ContextGroup>
                        )}
                        {errorOccurrence.custom_context_items?.length > 0 && (
                            <ContextGroup title="Custom" anchor="custom-context">
                                {errorOccurrence.custom_context_items.map((group) => (
                                    <ContextSection
                                        key={group.name}
                                        title={startCase(group.name)}
                                        anchor={`custom-context-${urlSlug(group.name)}`}
                                        icon={<FontAwesomeIcon fixedWidth icon={faAsterisk}/>}
                                        children={<Custom items={group.items}/>}
                                    />
                                ))}
                            </ContextGroup>
                        )}
                    </ContextSections>
                </InViewContextProvider>
            </div>
        </ErrorBoundary>
    );
}
