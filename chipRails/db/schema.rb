# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_27_181043) do
  create_table "components", charset: "latin1", force: :cascade do |t|
    t.string "group"
    t.string "name"
    t.string "version"
    t.bigint "metadatum_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["metadatum_id"], name: "index_components_on_metadatum_id"
  end

  create_table "dependencies", charset: "latin1", force: :cascade do |t|
    t.string "bom_ref"
    t.string "group"
    t.string "publisher"
    t.string "name"
    t.string "version"
    t.string "cpe"
    t.string "purl"
    t.bigint "sbom_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sbom_id"], name: "index_dependencies_on_sbom_id"
  end

  create_table "licenses", charset: "latin1", force: :cascade do |t|
    t.string "iden"
    t.bigint "dependency_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dependency_id"], name: "index_licenses_on_dependency_id"
  end

  create_table "metadata", charset: "latin1", force: :cascade do |t|
    t.string "timestamp"
    t.bigint "sbom_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sbom_id"], name: "index_metadata_on_sbom_id"
  end

  create_table "properties", charset: "latin1", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.bigint "dependency_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dependency_id"], name: "index_properties_on_dependency_id"
  end

  create_table "references", charset: "latin1", force: :cascade do |t|
    t.string "name"
    t.integer "age"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sboms", charset: "latin1", force: :cascade do |t|
    t.string "bomFormat"
    t.string "specVersion"
    t.string "serialNumber"
    t.integer "version"
    t.string "name"
    t.string "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sboms_on_user_id"
  end

  create_table "sub_components", charset: "latin1", force: :cascade do |t|
    t.string "bom_ref"
    t.string "group"
    t.string "publisher"
    t.string "name"
    t.string "version"
    t.string "cpe"
    t.string "purl"
    t.bigint "dependency_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dependency_id"], name: "index_sub_components_on_dependency_id"
  end

  create_table "tools", charset: "latin1", force: :cascade do |t|
    t.string "vendor"
    t.string "name"
    t.string "version"
    t.bigint "metadatum_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["metadatum_id"], name: "index_tools_on_metadatum_id"
  end

  create_table "users", charset: "latin1", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "components", "metadata"
  add_foreign_key "dependencies", "sboms"
  add_foreign_key "licenses", "dependencies"
  add_foreign_key "metadata", "sboms"
  add_foreign_key "properties", "dependencies"
  add_foreign_key "sboms", "users"
  add_foreign_key "sub_components", "dependencies"
  add_foreign_key "tools", "metadata"
end
