
const WEIGHT_OF_POST = 90
const COST_PER_POST = 1500
const COST_PER_METER_OF_BARBED_WIRE = 164
const COST_PER_KG_OF_U_NAILS = 300
const COST_PER_KG_OF_STRAIGHT_NAILS = 250

const totalArea = acres * 4046.86
const sideLength = Math.sqrt(totalArea)
const perimeter = sideLength * 4
const cornerBrace = corners;
const intermediateBrace = perimeter / interval - 1
const uprightPosts = cornerBrace
const totalPosts = uprightPosts + cornerBrace + intermediateBrace
const barbedWireEstimate = perimeter * barbedWire
const uNails = Math.ceil(cornerBrace * 1.5);
const straightNails = cornerBrace * 2;

const totalCostPosts = totalPosts * COST_PER_POST
const totalCostBarbedWire = barbedWireEstimate * COST_PER_METER_OF_BARBED_WIRE;
const totalCostUNails = uNails * COST_PER_KG_OF_U_NAILS;
const totalCostStraightNails = straightNails * COST_PER_KG_OF_STRAIGHT_NAILS;

