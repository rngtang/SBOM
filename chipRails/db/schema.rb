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

ActiveRecord::Schema[7.0].define(version: 2023_06_20_192449) do
  create_table "components", charset: "latin1", force: :cascade do |t|
    t.string "bom_ref"
    t.string "type"
    t.string "name"
    t.string "version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dependencies", charset: "latin1", force: :cascade do |t|
    t.string "bom_ref"
    t.string "type"
    t.string "publisher"
    t.string "name"
    t.string "version"
    t.string "cpe"
    t.string "purl"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "licenses", charset: "latin1", force: :cascade do |t|
    t.string "iden"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "metads", charset: "latin1", force: :cascade do |t|
    t.string "timestamp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "properties", charset: "latin1", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sboms", charset: "latin1", force: :cascade do |t|
    t.string "bomFormat"
    t.string "specVersion"
    t.string "serialNumber"
    t.integer "version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sub_components", charset: "latin1", force: :cascade do |t|
    t.string "bom_ref"
    t.string "type"
    t.string "publisher"
    t.string "name"
    t.string "version"
    t.string "cpe"
    t.string "purl"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tools", charset: "latin1", force: :cascade do |t|
    t.string "vendor"
    t.string "name"
    t.string "version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "latin1", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
