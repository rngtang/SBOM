class CreateTools < ActiveRecord::Migration[7.0]
  def change
    create_table :tools do |t|
      t.string :vendor
      t.string :name
      t.string :version
      #t.belongs_to :metad, foreign_key: true

      t.timestamps
    end
  end
end
