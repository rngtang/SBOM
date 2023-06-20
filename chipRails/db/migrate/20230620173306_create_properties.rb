class CreateProperties < ActiveRecord::Migration[7.0]
  def change
    create_table :properties do |t|
      t.string :name
      t.string :value
      #t.belongs_to :dependency

      t.timestamps
    end
  end
end
