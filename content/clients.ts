import {clients as suppliedClients} from '../src/data/clients';
import {clientVisibility} from '../src/data/publication';
export const clients=suppliedClients.map(client=>({...client,visible:clientVisibility[client.name]!==false,institution:['한국프랜차이즈산업협회','소상공인시장진흥공단','서울신용보증재단'].includes(client.name)}));
// 특정 로고를 숨기려면 위 데이터의 visible을 false로 설정하거나 기존 clientVisibility에 이름을 등록하세요.
