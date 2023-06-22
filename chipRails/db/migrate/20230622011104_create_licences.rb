class CreateLicences < ActiveRecord::Migration[7.0]
  def change
    create_table :licences do |t|
      t.string :id
      t.references :dependency, null: false, foreign_key: true

      t.timestamps
    end
  end
end
