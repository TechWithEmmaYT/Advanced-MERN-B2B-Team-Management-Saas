import mongoose, { Schema, Document } from "mongoose";
import { Permissions, Roles } from "../enums/role.enum";
import { RolePermissions } from "../utils/role-permissions";

export interface RoleDocument extends Document {
  name: keyof typeof Roles;
  permissions: Array<keyof typeof Permissions>;
}

const roleSchema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      enum: Object.values(Roles),
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permissions),
      required: true,
      default: function (this: RoleDocument) {
        // Dynamically assign permissions based on the role
        return RolePermissions[this.name];
      },
    },
  },
  {
    timestamps: true,
  }
);

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);
export default RoleModel;
