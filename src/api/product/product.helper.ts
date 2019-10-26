import { Product } from '../../shared/models/product.model';
import { CurrencyCode } from "../../shared/models/currency-code";
import { VanillaType, ExerciseMode } from '../../shared/models/payoff.vanilla.model';
import * as uuid from 'uuid';
import { randomDate, randomEnum, randomNumber } from '../../shared/helpers/random';
import { UnderlyingCode } from "../../shared/models/underlying-code";

export function generateProducts(size: number): Product[] {
  const products: Product[] = [];

  [...Array(size)].forEach((_, i) => {
    const product: Product = {
      id: uuid.v4(),
      payoff: {
        maturityDate: randomDate(new Date(2020, 0, 1), new Date(2018, 0, 1)),
        strike: Math.round(randomNumber(10, 100)),
        vanillaType: randomEnum(VanillaType),
        exerciseMode: randomEnum(ExerciseMode),
      },
      quantity: 1,
      quantoCurrency: randomEnum(CurrencyCode),
      underlying: randomEnum(UnderlyingCode),

    };

    products.push(product);
  });

  return products;
}
