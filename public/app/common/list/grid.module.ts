import 'jquery-ui/ui/sortable.js';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { GridDemo } from './grid-demo/grid-demo';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ GridDemo ]
})

export default class GridModule {
}
