import * as gusteauProto from "../../../contracts/proto/gusteau";
import BattleMove from "../../../domain/battle/value-objects/battle-move.vo";
import BattleMoveCellIdx from "../../../domain/battle/value-objects/move/battle-move-cell-idx.vo";
import BattleId from "../../../domain/battle/value-objects/battle-id.vo";

export class BattleMoveProtoMapper {
    static toProto(move: BattleMove): gusteauProto.BattleMove {
        return gusteauProto.BattleMove.create({
            battleId: move.battleId.value,
            cellIdx: move.cellIdx.value,
        });
    }

    static toDomain(move: gusteauProto.BattleMove): BattleMove {
        return BattleMove.create({
            battleId: new BattleId(move.battleId),
            cellIdx: new BattleMoveCellIdx(move.cellIdx),
        });
    }
}

export default BattleMoveProtoMapper;
