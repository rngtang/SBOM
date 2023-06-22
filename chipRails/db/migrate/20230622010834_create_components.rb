class CreateComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :components do |t|
      t.string :type
      t.string :name
      t.string :version
      t.references :metadatum, null: false, foreign_key: true

      t.timestamps
    end
  end
end