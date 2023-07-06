class CreateExternalReferences < ActiveRecord::Migration[7.0]
  def change
    create_table :external_references do |t|
      t.string :group
      t.string :url
      t.references :sbomComponent, null: false, foreign_key: true

      t.timestamps
    end
  end
end
