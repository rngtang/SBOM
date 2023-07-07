class CreateSources < ActiveRecord::Migration[7.0]
  def change
    create_table :sources do |t|
      t.string :name
      t.string :url
      t.references :vulnerability, null: false, foreign_key: true

      t.timestamps
    end
  end
end
