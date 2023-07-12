class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      #t.integer :iden
      # dummy fields for testing
      t.string :uid

      t.timestamps
    end
  end
end

