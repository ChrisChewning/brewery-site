import React from 'react';
import {without} from 'lodash';
//FN component

deleteMyBeers() {
  let tempBeer = this.state
  tempBeer = without(tempBeer, beer)
}
