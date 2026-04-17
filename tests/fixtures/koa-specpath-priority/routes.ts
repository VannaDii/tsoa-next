/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/tsoa-next/tsoa-next
import type { AdditionalProps, Tsoa, TsoaRoute } from 'tsoa-next';
import { fetchMiddlewares, KoaTemplateService } from 'tsoa-next';
import { createEmbeddedSpecGenerator, fetchSpecPaths, normalisePath, resolveSpecPathResponse } from 'tsoa-next';

import { SpecPathPriorityDynamicController } from './../controllers/specPathPriorityDynamicController';

import { SpecPathController } from './../controllers/specPathController';
import type { Context, Next, Middleware, Request as KRequest, Response as KResponse } from 'koa';
import type * as KoaRouter from '@koa/router';

const models: TsoaRoute.Models = {
};
const specGenerator = createEmbeddedSpecGenerator({"spec":{"openapi":"3.1.0","components":{"examples":{},"headers":{},"parameters":{},"requestBodies":{},"responses":{},"schemas":{},"securitySchemes":{"basic":{"scheme":"basic","type":"http"},"application":{"type":"oauth2","flows":{"clientCredentials":{"tokenUrl":"/ats-api/auth/token","scopes":{"user_read":"user read","user_write":"user_write"}}}},"password":{"type":"oauth2","flows":{"password":{"tokenUrl":"/ats-api/auth/token","scopes":{"user_read":"user read","user_write":"user_write"}}}},"accessCode":{"type":"oauth2","flows":{"authorizationCode":{"tokenUrl":"/ats-api/auth/token","authorizationUrl":"/ats-api/auth/authorization","scopes":{"user_read":"user read","user_write":"user_write"}}}},"implicit":{"type":"oauth2","flows":{"implicit":{"authorizationUrl":"/ats-api/auth/authorization","scopes":{"user_read":"user read","user_write":"user_write"}}}}}},"info":{"title":"Test API","version":"1.0.0","description":"Description of a test API","termsOfService":"https://example.com/terms/","license":{"name":"MIT"},"contact":{"email":"jane@doe.com","name":"Jane Doe","url":"www.jane-doe.com"}},"paths":{"/{tenant}/{resource}":{"get":{"operationId":"GetDynamicRouteMatch","responses":{"200":{"description":"Ok","content":{"application/json":{"schema":{"properties":{"tenant":{"type":"string"},"resource":{"type":"string"},"matched":{"type":"string"}},"required":["tenant","resource","matched"],"type":"object"}}}}},"security":[],"parameters":[{"in":"path","name":"tenant","required":true,"schema":{"type":"string"}},{"in":"path","name":"resource","required":true,"schema":{"type":"string"}}]}},"/SpecPath":{"get":{"operationId":"GetControllerStatus","responses":{"200":{"description":"Ok","content":{"application/json":{"schema":{"properties":{"ok":{"type":"boolean"}},"required":["ok"],"type":"object"}}}}},"security":[],"parameters":[]}}},"servers":[{"url":"https://localhost:3000/v1"}],"tags":[{"name":"hello","description":"Endpoints related to greeting functionality"}]},"yaml":"openapi: 3.1.0\ncomponents:\n  examples: {}\n  headers: {}\n  parameters: {}\n  requestBodies: {}\n  responses: {}\n  schemas: {}\n  securitySchemes:\n    basic:\n      scheme: basic\n      type: http\n    application:\n      type: oauth2\n      flows:\n        clientCredentials:\n          tokenUrl: /ats-api/auth/token\n          scopes:\n            user_read: user read\n            user_write: user_write\n    password:\n      type: oauth2\n      flows:\n        password:\n          tokenUrl: /ats-api/auth/token\n          scopes:\n            user_read: user read\n            user_write: user_write\n    accessCode:\n      type: oauth2\n      flows:\n        authorizationCode:\n          tokenUrl: /ats-api/auth/token\n          authorizationUrl: /ats-api/auth/authorization\n          scopes:\n            user_read: user read\n            user_write: user_write\n    implicit:\n      type: oauth2\n      flows:\n        implicit:\n          authorizationUrl: /ats-api/auth/authorization\n          scopes:\n            user_read: user read\n            user_write: user_write\ninfo:\n  title: Test API\n  version: 1.0.0\n  description: Description of a test API\n  termsOfService: https://example.com/terms/\n  license:\n    name: MIT\n  contact:\n    email: jane@doe.com\n    name: Jane Doe\n    url: www.jane-doe.com\npaths:\n  /{tenant}/{resource}:\n    get:\n      operationId: GetDynamicRouteMatch\n      responses:\n        \"200\":\n          description: Ok\n          content:\n            application/json:\n              schema:\n                properties:\n                  tenant:\n                    type: string\n                  resource:\n                    type: string\n                  matched:\n                    type: string\n                required:\n                  - tenant\n                  - resource\n                  - matched\n                type: object\n      security: []\n      parameters:\n        - in: path\n          name: tenant\n          required: true\n          schema:\n            type: string\n        - in: path\n          name: resource\n          required: true\n          schema:\n            type: string\n  /SpecPath:\n    get:\n      operationId: GetControllerStatus\n      responses:\n        \"200\":\n          description: Ok\n          content:\n            application/json:\n              schema:\n                properties:\n                  ok:\n                    type: boolean\n                required:\n                  - ok\n                type: object\n      security: []\n      parameters: []\nservers:\n  - url: https://localhost:3000/v1\ntags:\n  - name: hello\n    description: Endpoints related to greeting functionality\n"} as Parameters<typeof createEmbeddedSpecGenerator>[0]);

export function RegisterRoutes(router: KoaRouter,opts?:{validation?: Tsoa.ValidationContext}) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/tsoa-next/tsoa-next
    // ###########################################################################################################
    const additionalProps: AdditionalProps = {
      ...{"noImplicitAdditionalProperties":"silently-remove-extras","bodyCoercion":true},
      validation: opts?.validation,
    };
    const templateService = new KoaTemplateService(models, additionalProps);
    const registeredGetPaths = new Set<string>(["/v1/:tenant/:resource","/v1/SpecPath"]);
    for (const specPath of fetchSpecPaths(SpecPathPriorityDynamicController)) {
        if (specPath.gate === false) {
            continue;
        }

        const specFullPath = normalisePath('/v1/:tenant' + specPath.normalizedPath, '/', '', false);
        if (registeredGetPaths.has(specFullPath)) {
            throw new Error(`Duplicate GET route detected while registering @SpecPath for SpecPathPriorityDynamicController at '${specFullPath}'.`);
        }
        registeredGetPaths.add(specFullPath);

        router.get(specFullPath,
            async function SpecPathPriorityDynamicController_specPath(context: Context, next: Next) {
                try {
                    const specResponse = await resolveSpecPathResponse({
                        controllerClass: SpecPathPriorityDynamicController,
                        fullPath: specFullPath,
                        request: context.request,
                        response: context.response,
                        runtime: 'koa',
                        specGenerator,
                        specPath,
                    });

                    if (specResponse.contentType) {
                        context.type = specResponse.contentType;
                    }

                    context.status = 200;
                    context.body = specResponse.body;
                    return;
                } catch (err) {
                    const error = err as any;
                    context.status = error.status || 500;
                    context.throw(context.status, error.message, error);
                }
            });
    }
    for (const specPath of fetchSpecPaths(SpecPathController)) {
        if (specPath.gate === false) {
            continue;
        }

        const specFullPath = normalisePath('/v1/SpecPath' + specPath.normalizedPath, '/', '', false);
        if (registeredGetPaths.has(specFullPath)) {
            throw new Error(`Duplicate GET route detected while registering @SpecPath for SpecPathController at '${specFullPath}'.`);
        }
        registeredGetPaths.add(specFullPath);

        router.get(specFullPath,
            async function SpecPathController_specPath(context: Context, next: Next) {
                try {
                    const specResponse = await resolveSpecPathResponse({
                        controllerClass: SpecPathController,
                        fullPath: specFullPath,
                        request: context.request,
                        response: context.response,
                        runtime: 'koa',
                        specGenerator,
                        specPath,
                    });

                    if (specResponse.contentType) {
                        context.type = specResponse.contentType;
                    }

                    context.status = 200;
                    context.body = specResponse.body;
                    return;
                } catch (err) {
                    const error = err as any;
                    context.status = error.status || 500;
                    context.throw(context.status, error.message, error);
                }
            });
    }
        const argsSpecPathPriorityDynamicController_getDynamicRouteMatch: Record<string, TsoaRoute.ParameterSchema> = {
                tenant: {"in":"path","name":"tenant","parameterIndex":0,"required":true,"dataType":"string"},
                resource: {"in":"path","name":"resource","parameterIndex":1,"required":true,"dataType":"string"},
        };
        router.get('/v1/:tenant/:resource',
            ...(fetchMiddlewares<Middleware>(SpecPathPriorityDynamicController)),
            ...(fetchMiddlewares<Middleware>(SpecPathPriorityDynamicController.prototype.getDynamicRouteMatch)),

            async function SpecPathPriorityDynamicController_getDynamicRouteMatch(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsSpecPathPriorityDynamicController_getDynamicRouteMatch, controllerClass: SpecPathPriorityDynamicController, methodName: 'getDynamicRouteMatch', context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new SpecPathPriorityDynamicController();

            return templateService.apiHandler({
              methodName: 'getDynamicRouteMatch',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
        const argsSpecPathController_getControllerStatus: Record<string, TsoaRoute.ParameterSchema> = {
        };
        router.get('/v1/SpecPath',
            ...(fetchMiddlewares<Middleware>(SpecPathController)),
            ...(fetchMiddlewares<Middleware>(SpecPathController.prototype.getControllerStatus)),

            async function SpecPathController_getControllerStatus(context: Context, next: Next) {

            let validatedArgs: any[] = [];
            try {
              validatedArgs = templateService.getValidatedArgs({ args: argsSpecPathController_getControllerStatus, controllerClass: SpecPathController, methodName: 'getControllerStatus', context, next });
            } catch (err) {
              const error = err as any;
              error.message ||= JSON.stringify({ fields: error.fields });
              context.status = error.status;
              context.throw(context.status, error.message, error);
            }

            const controller = new SpecPathController();

            return templateService.apiHandler({
              methodName: 'getControllerStatus',
              controller,
              context,
              validatedArgs,
              successStatus: undefined,
            });
        });
}
