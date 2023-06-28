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

ActiveRecord::Schema[7.0].define(version: 2023_06_27_175308) do
  create_table "children", charset: "latin1", force: :cascade do |t|
    t.string "ref"
    t.text "dependsOn"
    t.bigint "sbom_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sbom_id"], name: "index_children_on_sbom_id"
  end

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

  create_table "external_references", charset: "latin1", force: :cascade do |t|
    t.string "group"
    t.string "url"
    t.bigint "dependency_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dependency_id"], name: "index_external_references_on_dependency_id"
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

  create_table "ratings", charset: "latin1", force: :cascade do |t|
    t.integer "score"
    t.string "severity"
    t.bigint "vulnerability_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["vulnerability_id"], name: "index_ratings_on_vulnerability_id"
  end

  create_table "sboms", charset: "latin1", force: :cascade do |t|
    t.string "bomFormat"
    t.string "specVersion"
    t.string "serialNumber"
    t.integer "version"
    t.string "name"
    t.string "description"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sboms_on_user_id"
  end

  create_table "sources", charset: "latin1", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.bigint "rating_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rating_id"], name: "index_sources_on_rating_id"
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
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vulnerabilities", charset: "latin1", force: :cascade do |t|
    t.string "bom_ref"
    t.string "vulnID"
    t.string "description"
    t.string "detail"
    t.string "recommendation"
    t.string "created"
    t.string "published"
    t.string "updated"
    t.text "affected"
    t.bigint "sbom_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sbom_id"], name: "index_vulnerabilities_on_sbom_id"
  end

  add_foreign_key "children", "sboms"
  add_foreign_key "components", "metadata"
  add_foreign_key "dependencies", "sboms"
  add_foreign_key "external_references", "dependencies"
  add_foreign_key "licenses", "dependencies"
  add_foreign_key "metadata", "sboms"
  add_foreign_key "properties", "dependencies"
  add_foreign_key "ratings", "vulnerabilities"
  add_foreign_key "sboms", "users"
  add_foreign_key "sources", "ratings"
  add_foreign_key "tools", "metadata"
  add_foreign_key "vulnerabilities", "sboms"
end
