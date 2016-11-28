import { Injectable } from '@angular/core';
import { beforeMethod, Metadata } from 'aspect.js';

@Injectable()
export class LoggingAspect {
    @beforeMethod({
        classNamePattern: /(User)Service/,
        methodNamePattern: /^(get)/
    })
    invokeBeforeMethod(meta: Metadata) {
        console.log(`Inside of the logger.
      Called ${meta.className}.${meta.method.name}
      with args: ${meta.method.args.join(', ')}.`
        );
    }
}
