import React from 'react';
import DefinitionList from '../../ui/DefinitionList';
import { RouteContext } from '../../../types';
import UnorderedList from '../../ui/UnorderedList';

export default function Routing({ route }: { route: RouteContext }) {
    return (
        <DefinitionList>
            <DefinitionList.Row value={route.controllerAction} label="Controller" />
            {route.route && <DefinitionList.Row value={route.route} label="Route name" />}
            {!!route.routeParameters?.length && (
                <DefinitionList.Row
                    value={
                        <DefinitionList>
                            {Object.entries(route.routeParameters).map(([key, parameter]) => (
                                <DefinitionList.Row stacked key={key} label={key} value={parameter as string} />
                            ))}
                        </DefinitionList>
                    }
                    label="Route parameters"
                />
            )}
            {route.middleware && (
                <DefinitionList.Row
                    value={
                        <UnorderedList>
                            {(route.middleware || []).map((middleware: string, i: number) => (
                                <UnorderedList.Item key={i} value={middleware} />
                            ))}
                        </UnorderedList>
                    }
                    label="Middleware"
                />
            )}
        </DefinitionList>
    );
}
